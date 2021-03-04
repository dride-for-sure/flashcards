package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.service.SocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Controller
public class SocketController {

 private final SocketService socketService;

 @Autowired
 public SocketController (
         SocketService socketService ) {
  this.socketService = socketService;
 }

 // Player joins lobby
 @SubscribeMapping ( "/lobby" )
 public List<GameDto> sendOpenGames () {
  return socketService.listOpenGames();
 }

 // Player opens new game
 @SubscribeMapping ( "/game/{difficulty}" )
 public GameDto openGame (
         @DestinationVariable String difficulty,
         String playerName,
         Principal principal
 ) {
  return socketService.openGame( principal, playerName,
          Difficulty.valueOf( difficulty.toUpperCase() ) );
 }

 // Player enters existing game
 @SubscribeMapping ( "/game/{gameId}" )
 public GameDto joinGame (
         @DestinationVariable String gameId,
         String playerName,
         Principal principal
 ) {
  return socketService.joinGame( principal, playerName, gameId ).orElseThrow(
          () -> new ResponseStatusException( HttpStatus.BAD_REQUEST, "Could not join the game" ) );
 }

 // Receive answers
 @MessageMapping ( "/game/{gameId}/answers" )
 public void receiveAnswer (
         @DestinationVariable String gameId,
         AnswerDto answerDto,
         Principal principal ) {
  socketService.receiveAnswer( principal, gameId, answerDto );
 }
}
