package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.config.GameConfig;
import com.dennisjauernig.flashcards.controller.model.*;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.Question;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LogicService {

 private final MessagingService messagingService;
 private final GamesService gamesService;
 private final PlayerService playerService;
 private final AnswerService answerService;
 private final QuestionsService questionsService;
 private final SessionService sessionService;
 private final ExecutorService executorService;
 private final GameConfig gameConfig;
 private final CleanUpService cleanUpService;
 private final GamesDb gamesDb;

 public LogicService (
         MessagingService messagingService,
         GamesService gamesService,
         PlayerService playerService,
         AnswerService answerService,
         QuestionsService questionsService,
         SessionService sessionService,
         ExecutorService executorService,
         GameConfig gameConfig,
         CleanUpService cleanUpService,
         GamesDb gamesDb ) {
  this.messagingService = messagingService;
  this.gamesService = gamesService;
  this.playerService = playerService;
  this.answerService = answerService;
  this.questionsService = questionsService;
  this.sessionService = sessionService;
  this.executorService = executorService;
  this.gameConfig = gameConfig;
  this.cleanUpService = cleanUpService;
  this.gamesDb = gamesDb;
 }

 // √ Player joins lobby
 public GameDtoList joinLobby () {
  List<GameDto> gameDtoList = gamesService.listAvailableGames();
  return gamesService.addTypeToGameDtoList( gameDtoList );
 }

 // √ Player joins game
 public Optional<UUID> joinGame (
         String sessionId,
         Difficulty difficulty,
         UUID gameId,
         PlayerDto playerDto ) {
  playerService.registerPlayer( sessionId, playerDto );
  Optional<Game> game = gamesService.getById( gameId );
  if ( game.isPresent() ) {
   return joinExistingGame( playerDto, game.get() );
  }
  if ( !gamesService.isMaxOpenGames() ) {
   Game newGame = gamesService.generateNewGame( playerDto, difficulty, gameId );
   gamesService.saveGame( newGame );
   messagingService.broadcastGameDtoList( gamesService.listAvailableGames() );
   messagingService.broadcastGameDto( newGame );
   return Optional.of( newGame.getId() );
  }
  return Optional.empty();
 }

 // √ Player joins existing game
 private Optional<UUID> joinExistingGame ( PlayerDto playerDto, Game game ) {
  if ( gamesService.hasPlayer( playerDto.getId(), game ) ) {
   return playerExistsWithinGame( playerDto, game );
  }
  return addPlayerToExistingGame( playerDto, game );
 }

 // √ Add the player to existing game
 private Optional<UUID> addPlayerToExistingGame (
         PlayerDto playerDto,
         Game game ) {
  List<Question> questionList = game.getQuestionList();
  List<QuestionDto> questionDtoList = questionsService.convertQuestionListToDto( questionList );
  Player player = playerService.generateNewPlayer( playerDto, questionDtoList );
  Game updatedGame = gamesService.addPlayerToGame( game, player );
  gamesService.saveGame( updatedGame );
  if ( gamesService.hasStatus( GameStatus.PLAY, updatedGame ) ) {
   messagingService.broadcastQuestionDtoListToPlayer( questionDtoList, playerDto.getId() );
  }
  messagingService.broadcastGameDto( updatedGame );
  return Optional.of( updatedGame.getId() );
 }

 // √ The given player exists within game
 private Optional<UUID> playerExistsWithinGame (
         PlayerDto playerDto,
         Game game ) {
  if ( gamesService.hasStatus( GameStatus.PLAY, game ) ) {
   List<QuestionDto> questionDtoList = questionsService.getQuestionListDto( game,
           playerDto.getId() );
   messagingService.broadcastQuestionDtoListToPlayer( questionDtoList, playerDto.getId() );
  }
  messagingService.broadcastGameDto( game );
  return Optional.of( game.getId() );
 }

 // √ Start the game
 public Optional<UUID> startGame ( UUID gameId, String sessionId ) {
  Optional<Game> game = gamesService.getById( gameId );
  Optional<UUID> playerId = sessionService.getPlayerIdBySessionId( sessionId );
  if ( game.isPresent()
          && playerId.isPresent()
          && gamesService.isGameMaster( game.get(), playerId.get() )
          && gamesService.hasStatus( GameStatus.PREPARE, game.get() ) ) {
   Game startedGame = gamesService.setGameStatusToPlay( game.get() );
   gamesDb.save( startedGame );
   List<GameDto> availableGames = gamesService.listAvailableGames();
   messagingService.broadcastGameDtoList( availableGames );
   messagingService.broadcastQuestionDtoList( game.get() );
   messagingService.broadcastGameDto( startedGame );
   return Optional.of( startedGame.getId() );
  }
  return Optional.empty();
 }

 // √ Answer received
 public Optional<UUID> receiveAnswer (
         UUID gameId,
         UUID playerId,
         AnswerDto answerDto ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() && gamesService.hasPlayer( playerId, game.get() ) ) {
   Game updatedGame = answerService.updateGameWithReceivedAnswer( playerId, game.get(), answerDto );
   List<QuestionDto> questionDtoList = questionsService.getQuestionListDto( updatedGame, playerId );
   messagingService.broadcastGameDto( updatedGame );
   messagingService.broadcastQuestionDtoListToPlayer( questionDtoList, playerId );
   gamesDb.save( updatedGame );
   return Optional.of( gameId );
  }
  return Optional.empty();
 }

 // √ Remove player from sessionDb & cleanup affected games
 public void leaveGame ( String sessionId ) {
  sessionService.deregisterPlayer( sessionId );
  executorService.scheduleTask( () -> cleanUpService.cleanUpEmptyGames(), gameConfig.getDeleteGamesDelay() );
 }
}
