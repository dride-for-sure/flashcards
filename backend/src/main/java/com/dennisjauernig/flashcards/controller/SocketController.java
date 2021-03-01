package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.controller.model.ReceivedAnswerDto;
import com.dennisjauernig.flashcards.controller.model.StartGameDto;
import com.dennisjauernig.flashcards.model.Answer;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.service.AnswerService;
import com.dennisjauernig.flashcards.service.MessagingService;
import com.dennisjauernig.flashcards.service.PlayerService;
import com.dennisjauernig.flashcards.service.StartGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Controller
public class SocketController {

 private final AnswerService answerService;
 private final PlayerService playerService;
 private final StartGameService startGameService;
 private final MessagingService messagingService;

 @Autowired
 public SocketController (
         AnswerService answerService,
         PlayerService playerService,
         StartGameService startGameService,
         MessagingService messagingService ) {
  this.answerService = answerService;
  this.playerService = playerService;
  this.startGameService = startGameService;
  this.messagingService = messagingService;
 }

 @MessageMapping ( "/games" )
 @SendTo ( "/api/games" )
 public List<Game> registerPlayer ( NewPlayerDto dto ) {
  return playerService.registerPlayer( dto );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}" )
 public void startGame ( StartGameDto dto ) {
  Game game = startGameService.startGame( dto )
                              .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                                      "Card is not available" ) );
  messagingService.sendGameUpdates( game );
 }

 @MessageMapping ( "/games/{gameId}/{playerId}" )
 @SendTo ( "/topic/games/{gameId}" )
 public Answer receivedAnswer (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId,
         ReceivedAnswerDto dto ) {
  return answerService.receivedAnswer( UUID.fromString( gameId ), UUID.fromString( playerId ), dto )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "Answer: " + dto.getUuid() + " within the game: " + gameId + " could not be " +
                                      "received" ) );
 }
}
