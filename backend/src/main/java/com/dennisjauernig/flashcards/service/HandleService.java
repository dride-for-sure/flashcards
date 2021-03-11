package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.*;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HandleService {

 private final MessagingService messagingService;
 private final GamesService gamesService;
 private final PlayerService playerService;
 private final AnswerService answerService;
 private final GamesDb gamesDb;

 public HandleService (
         MessagingService messagingService,
         GamesService gamesService,
         PlayerService playerService,
         AnswerService answerService,
         GamesDb gamesDb ) {
  this.messagingService = messagingService;
  this.gamesService = gamesService;
  this.playerService = playerService;
  this.answerService = answerService;
  this.gamesDb = gamesDb;
 }

 // √ Player joins lobby
 public GameDtoList listAvailableGames () {
  return GameDtoList.builder().gameDtoList( gamesService.listAvailableGames() ).build();
 }

 // √ Player opens new game
 public Optional<GameDto> newGame ( PlayerDto playerDto, Difficulty difficulty ) {
  if ( gamesService.isMaxOpenGames() ) {
   System.out.println( "Max open games reached" );
   return Optional.empty();
  }
  Game game = gamesService.generateNewGame( playerDto, difficulty );
  gamesDb.save( game );
  GameDto gameDto = gamesService.convertGameToDto( game );
  messagingService.broadcastGameDtoToLobby( listAvailableGames() );
  System.out.println( "New game: " + gameDto.getId() );
  return Optional.of( gameDto );
 }

 // √ Player enters existing game
 public Optional<GameDto> joinGame ( PlayerDto playerDto, UUID gameId ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() ) {
   boolean playerExists = gamesService.isPlayerWithinExistingGame( playerDto.getId(), game.get() );

   if ( playerExists ) {
    return Optional.of( gamesService.convertGameToDto( game.get() ) );

   } else {
    Player player = playerService.generateNewPlayer( playerDto, game.get().getQuestionList() );
    Game updatedGame = gamesService.addPlayerToGame( game.get(), player );
    gamesDb.save( updatedGame );
    GameDto gameDto = gamesService.convertGameToDto( updatedGame );
    messagingService.broadcastGameDtoToPlayer( gameDto );
    return Optional.of( gameDto );
   }
  }
  return Optional.empty();
 }

 // √ Start the game
 public Optional<GameDto> startGame ( UUID gameId, PlayerDto playerDto ) {
  System.out.print( "Try to start game: " + gameId );
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() && gamesService.isGameMaster( game.get(), playerDto.getId() ) ) {
   Game startedGame = gamesService.setGameStatusToPlay( game.get() );
   gamesDb.save( startedGame );
   GameDto gameDto = gamesService.convertGameToDto( startedGame );
   messagingService.broadcastGameDtoToLobby( listAvailableGames() );
   messagingService.broadcastGameDtoToPlayer( gameDto );
   broadcastQuestionDtoList( game.get() );
   return Optional.of( gameDto );
  }
  System.out.println( "Not possible to start" );
  return Optional.empty();
 }

 // √ Answer received
 public Optional<QuestionDtoList> receiveAnswer (
         UUID gameId,
         UUID playerId,
         AnswerDto answerDto ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent()
          && gamesService.isPlayerWithinExistingGame( playerId, game.get() ) ) {
   Game updatedGame = answerService.updateGameWithReceivedAnswer( playerId, game.get(), answerDto );
   gamesDb.save( updatedGame );
   GameDto gameDto = gamesService.convertGameToDto( updatedGame );
   messagingService.broadcastGameDtoToPlayer( gameDto );
   List<QuestionDto> questionDtoList = gamesService.getQuestionListDto( updatedGame, playerId );
   return Optional.of( QuestionDtoList.builder().questionDtoList( questionDtoList ).build() );
  }
  return Optional.empty();
 }

 // √ Send questionDtoList to all player within the game
 private void broadcastQuestionDtoList ( Game game ) {
  for ( Player player : game.getPlayerList() ) {
   List<QuestionDto> questionDtoList = gamesService.getQuestionListDto( game, player.getId() );
   messagingService.broadcastQuestionDtoListToPlayer(
           player.getId(), game.getId(),
           QuestionDtoList.builder().questionDtoList( questionDtoList ).build() );
  }
 }

 // √ Get the questionDtoList for a specific player and game
 public Optional<QuestionDtoList> listGameQuestionDto ( UUID gameId, UUID playerId ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent()
          && gamesService.isPlayerWithinExistingGame( playerId, game.get() )
          && !game.get().getStatus().equals( GameStatus.PREPARE ) ) {
   List<QuestionDto> questionDtoList = gamesService.getQuestionListDto( game.get(), playerId );
   return Optional.of( QuestionDtoList.builder().questionDtoList( questionDtoList ).build() );
  }
  return Optional.empty();
 }
}
