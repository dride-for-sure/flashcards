package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDtoList;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.service.LogicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Controller
public class SocketController {

 private final LogicService logicService;

 @Autowired
 public SocketController ( LogicService logicService ) {
  this.logicService = logicService;
 }

 // √ Join lobby
 @SubscribeMapping ( "/games" )
 public GameDtoList joinLobby () {
  return logicService.joinLobby();
 }

 // √ Join game
 @SubscribeMapping ( "/games/{difficulty}/{gameId}/join" )
 public UUID joinGame (
         @Header ( "simpSessionId" ) String sessionId,
         @DestinationVariable String difficulty,
         @DestinationVariable UUID gameId,
         PlayerDto playerDto ) {
  return logicService.joinGame( sessionId, Difficulty.valueOf( difficulty ), gameId, playerDto )
                     .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST, "Could not " +
                             "join or open a new game with id " + gameId + " and difficulty " + difficulty ) );
 }

 // √ Start game
 @SubscribeMapping ( "/games/{difficulty}/{gameId}/start" )
 public UUID startGame (
         @Header ( "simpSessionId" ) String sessionId,
         @DestinationVariable UUID gameId ) {
  return logicService.startGame( gameId, sessionId )
                     .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST, "Could not " +
                             "start game with id: " + gameId ) );
 }


 // √ Receive answers
 @SubscribeMapping ( "/player/{playerId}/{gameId}" )
 public UUID receiveAnswer (
         @DestinationVariable UUID gameId,
         @DestinationVariable UUID playerId,
         AnswerDto answerDto ) {
  return logicService.receiveAnswer( gameId, playerId, answerDto )
                     .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST, "Answer not possible" ) );
 }

 // √ Leave game
 @SubscribeMapping ( "/games/{difficulty}/{gameId}/leave" )
 public void leaveGame (
         @Header ( "simpSessionId" ) String sessionId ) {
  logicService.leaveGame( sessionId );
 }
}
