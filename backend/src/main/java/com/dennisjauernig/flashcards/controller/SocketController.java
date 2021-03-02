package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.service.AnswerService;
import com.dennisjauernig.flashcards.service.LobbyService;
import com.dennisjauernig.flashcards.service.PreparationService;
import com.dennisjauernig.flashcards.service.StartGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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

 @SubscribeMapping ( "/api/topic/games" )
 public List<GameDto> sendOpenGames () {
  return lobbyService.listOpenGames();
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}" )
 @SendTo ( "/api/games/{difficulty}/{gameId}" )
 public GameDto prepareGame (
         @DestinationVariable Difficulty difficulty,
         @DestinationVariable String gameId, PlayerDto playerDto ) {
  return preparationService.prepareGame( playerDto, gameId, difficulty );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}/{playerId}/start" )
 public void startGame (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId ) {
  startGameService.startGame( gameId, playerId );
 }

 @MessageMapping ( "/games/{difficulty}/{gameId}/{playerId}" )
 public void updateGame (
         @DestinationVariable String gameId,
         @DestinationVariable String playerId,
         AnswerDto answerDto ) {
  answerService.updateGame( gameId, playerId, answerDto );
 }
}
