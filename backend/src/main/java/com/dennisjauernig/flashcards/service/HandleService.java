package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
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
 public List<GameDto> listAvailableGames () {
  return gamesService.listAvailableGames();
 }

 // √ Player opens new game
 public Optional<GameDto> newGame ( PlayerDto playerDto, Difficulty difficulty ) {
  if ( gamesService.isMaxOpenGames() ) {
   return Optional.empty();
  }
  Game game = gamesService.generateNewGame( playerDto, difficulty );
  return Optional.of( gamesService.convertGameToDto( gamesDb.save( game ) ) );
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
    messagingService.broadcastGameDto( gameDto );
    return Optional.of( gameDto );
   }
  }
  return Optional.empty();
 }

 // √ Start the game
 public Optional<GameDto> startGame ( UUID gameId, PlayerDto playerDto ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() && gamesService.isGameMaster( game.get(), playerDto.getId() ) ) {
   Game startedGame = gamesService.setGameStatusToPlay( game.get() );
   gamesDb.save( startedGame );
   GameDto gameDto = gamesService.convertGameToDto( startedGame );
   messagingService.broadcastGameDto( gameDto );
   broadcastQuestionDtoList( game.get() );
   return Optional.of( gameDto );
  }
  return Optional.empty();
 }

 // √ Get the questionDtoList for a specific player and game
 public Optional<List<QuestionDto>> listGameQuestionDto ( UUID gameId, UUID playerId ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() && gamesService.isPlayerWithinExistingGame( playerId, game.get() ) ) {
   return Optional.of( gamesService.getQuestionListDto( game.get(), playerId ) );
  }
  return Optional.empty();
 }

 // √ Answer received
 public Optional<GameDto> receiveAnswer (
         UUID gameId,
         UUID playerId,
         AnswerDto answerDto ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() && gamesService.isPlayerWithinExistingGame( playerId, game.get() ) ) {
   Game updatedGame = answerService.updateGameWithReceivedAnswer( playerId, game.get(), answerDto );
   gamesDb.save( updatedGame );
   broadcastQuestionDtoList( updatedGame );
   GameDto gameDto = gamesService.convertGameToDto( updatedGame );
   return Optional.of( gameDto );
  }
  return Optional.empty();
 }

 // √ Send questionDtoList to all player within the game
 private void broadcastQuestionDtoList ( Game game ) {
  for ( Player player : game.getPlayerList() ) {
   List<QuestionDto> questionDtoList = gamesService.getQuestionListDto( game, player.getId() );
   messagingService.broadcastQuestionDtoList( player.getId(), game.getId(), questionDtoList );
  }
 }

}
