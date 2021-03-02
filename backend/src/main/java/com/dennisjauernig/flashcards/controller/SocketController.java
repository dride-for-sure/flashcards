package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerJoinsGameDto;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.service.LobbyService;
import com.dennisjauernig.flashcards.service.PlayService;
import com.dennisjauernig.flashcards.service.PreparationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Controller
public class SocketController {

 private final PlayService playService;
 private final PreparationService preparationService;
 private final LobbyService lobbyService;

 @Autowired
 public SocketController (
         PlayService playService,
         LobbyService lobbyService,
         PreparationService preparationService ) {
  this.playService = playService;
  this.preparationService = preparationService;
  this.lobbyService = lobbyService;
 }

 @SubscribeMapping ( "/api/topic/games" )
 public List<GameDto> sendOpenGames () {
  return lobbyService.listOpenGames();
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}" )
 @SendTo ( "/api/games/{difficulty}/{gameId}" )
 public GameDto prepareGame (
         @DestinationVariable Difficulty difficulty,
         @DestinationVariable String gameId, PlayerJoinsGameDto dto ) {
  return preparationService.prepareGame( dto, gameId, difficulty );
 }


 @MessageMapping ( "/games/{difficulty}/{gameId}/{playerId}" )
 @SendTo ( "/api/games/{difficulty}/{gameId}/{playerId}" )
 public GameDto updateGame (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId,
         ReceivedAnswerDto dto ) {
  return playService.updateGame( dto, gameId, playerId )
                    .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                            "Answer could not be processed" ) );
 }
}
