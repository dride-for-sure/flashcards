package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.*;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.service.GameService;
import com.dennisjauernig.flashcards.service.PlayerService;
import com.dennisjauernig.flashcards.service.PrepareGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Controller
public class SocketController {

 private final GameService gameService;
 private final PlayerService playerService;
 private final PrepareGameService prepareGameService;

 @Autowired
 public SocketController (
         GameService gameService,
         PlayerService playerService,
         PrepareGameService prepareGameService ) {
  this.gameService = gameService;
  this.playerService = playerService;
  this.prepareGameService = prepareGameService;
 }

 @MessageMapping ( "/games" )
 @SendTo ( "/api/games" )
 public List<OpenGameDto> registerPlayer ( NewPlayerDto dto ) {
  return playerService.registerPlayer( dto );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}" )
 @SendTo ( "/api/games/{difficulty}/{gameId}" )
 public PrepareGameDto prepareGame (
         @DestinationVariable Difficulty difficulty,
         @DestinationVariable String gameId, PlayerJoinsGameDto dto ) {
  return prepareGameService.prepareGame( dto, gameId, difficulty )
                           .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                                   "Player could not join the game" ) );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}/{playerId}" )
 @SendTo ( "/api/games/{difficulty}/{gameId}/{playerId}" )
 public UpdateGameDto updateGame (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId,
         ReceivedAnswerDto dto ) {
  return gameService.updateGame( dto, gameId, playerId )
                    .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                            "Answer could not be processed" ) );
 }
}
