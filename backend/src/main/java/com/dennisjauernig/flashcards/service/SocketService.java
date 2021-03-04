package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDetailsDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class SocketService {

 private final MessagingService messagingService;
 private final GamesService gamesService;
 private final PlayerService playerService;
 private final AnswerService answerService;
 private final GamesDb gamesDb;

 public SocketService (
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

 // Player joins lobby
 public List<GameDto> listOpenGames () {
  return gamesService.listOpenGames();
 }

 // Player opens new game
 public GameDto openGame ( Principal principal, String playerName, Difficulty difficulty ) {
  Game game = gamesService.generateNewGame( principal, playerName, difficulty );
  return gamesService.convertGameToDto( gamesDb.save( game ) );
 }

 // Player enters existing game
 public Optional<GameDto> joinGame ( Principal principal, String playerName, String gameId ) {
  Optional<Game> game = gamesDb.findById( gameId );
  if ( game.isPresent() ) {
   boolean playerExists = gamesService.isPlayerExists( principal, game.get() );

   if ( playerExists && !game.get().getStatus().equals( GameStatus.PREPARE ) ) {
    GameDetailsDto gameDetailsDto = gamesService.convertGameToDetailsDto( game.get(), principal );
    messagingService.sendToPlayer( principal, gameDetailsDto );

   } else {
    Player player = playerService.generateNewPlayer( principal, playerName,
            game.get().getQuestionList() );
    Game updatedGame = gamesService.addPlayerToGame( game.get(), player );
    gamesDb.save( updatedGame );
    sendToAllPlayers( updatedGame );
    return Optional.of( gamesService.convertGameToDto( updatedGame ) );
   }
  }
  return Optional.empty();
 }

 // Answer received
 public void receiveAnswer (
         Principal principal,
         String gameId,
         AnswerDto answerDto ) {
  Optional<Game> game = gamesDb.findById( gameId );

  if ( game.isPresent() && gamesService.isPlayerExists( principal, game.get() ) ) {
   Game updatedGame = answerService.updateGame( principal, game.get(), answerDto );
   gamesDb.save( updatedGame );
   sendToAllPlayers( updatedGame );
  }
 }

 private void sendToAllPlayers ( Game game ) {
  for ( Player player : game.getPlayerList() ) {
   GameDetailsDto gameDetailsDto = gamesService.convertGameToDetailsDto( game, player.getId() );
   messagingService.sendToPlayer( player.getId(), gameDetailsDto );
  }
 }
}
