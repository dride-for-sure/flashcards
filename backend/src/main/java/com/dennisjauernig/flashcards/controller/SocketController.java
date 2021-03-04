package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.service.AnswerService;
import com.dennisjauernig.flashcards.controller.service.LobbyService;
import com.dennisjauernig.flashcards.controller.service.PreparationService;
import com.dennisjauernig.flashcards.controller.service.StartGameService;
import com.dennisjauernig.flashcards.model.Difficulty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SocketController {

 private final AnswerService answerService;
 private final PreparationService preparationService;
 private final LobbyService lobbyService;
 private final StartGameService startGameService;

 @Autowired
 public SocketController (
         AnswerService answerService,
         LobbyService lobbyService,
         PreparationService preparationService,
         StartGameService startGameService ) {
  this.answerService = answerService;
  this.preparationService = preparationService;
  this.lobbyService = lobbyService;
  this.startGameService = startGameService;
 }

 @SubscribeMapping ( "/games" )
 public List<GameDto> sendOpenGames () {
  return lobbyService.listOpenGames();
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}" )
 @SendTo ( "/topic/games/{difficulty}/{gameId}" )
 public GameDto prepareGame (
         @Header ( "simpSessionId" ) String sessionId,
         @DestinationVariable String difficulty,
         @DestinationVariable String gameId, PlayerDto playerDto ) {
  System.out.println( "Prepare Game" );
  System.out.println( sessionId );
  return preparationService.prepareGame( playerDto, gameId,
          Difficulty.valueOf( difficulty.toUpperCase() ) );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}/{playerId}/start" )
 public void startGame (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId ) {
  System.out.println( "Start Game" );
  startGameService.startGame( gameId, playerId );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}/{playerId}" )
 public void updateGame (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId,
         AnswerDto answerDto ) {
  System.out.println( "Update Game" );
  answerService.updateGame( gameId, playerId, answerDto );
 }
}
