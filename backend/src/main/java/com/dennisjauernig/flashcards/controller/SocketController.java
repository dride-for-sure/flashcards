package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.service.HandleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Controller
public class SocketController {

 private final HandleService handleService;

 @Autowired
 public SocketController (
         HandleService handleService ) {
  this.handleService = handleService;
 }

 // √ Get questionDtoList for a subscribing player
 @SubscribeMapping ( "/user/{gameId}/{playerId}" )
 public List<QuestionDto> listGameQuestionDto (
         @PathVariable UUID gameId,
         @PathVariable UUID playerId
 ) {
  return handleService.listGameQuestionDto( gameId, playerId )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "This game: " + gameId + " does not exist" ) );
 }

 // √ Receive answers
 @MessageMapping ( "/game/{gameId}/{playerId}" )
 @SendTo ( "/topic/game/{gameId}" )
 public GameDto receiveAnswer (
         @DestinationVariable UUID gameId,
         @PathVariable UUID playerId,
         AnswerDto answerDto ) {
  return handleService.receiveAnswer( gameId, playerId, answerDto )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "The Answer could not be processed" ) );
 }
}
