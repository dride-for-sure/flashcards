package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDtoList;
import com.dennisjauernig.flashcards.service.HandleService;
import com.dennisjauernig.flashcards.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Controller
public class SocketController {

 private final HandleService handleService;
 private final SessionService sessionService;

 @Autowired
 public SocketController (
         HandleService handleService,
         SessionService sessionService ) {
  this.handleService = handleService;
  this.sessionService = sessionService;
 }

 // √ Watch player connection status
 @SubscribeMapping ( "/user/{gameId}" )
 public void registerNewPlayer (
         @Header ( "simpSessionId" ) String sessionId,
         @DestinationVariable UUID gameId ) {
  System.out.println( "(SubscribeMapping) connect: " + sessionId );
  sessionService.registerNewPLayer( sessionId, gameId );
 }

 // √ Watch player disconnected status
 @RequestMapping ( "/user/{gameId}" )
 public void deregisterPlayer (
         @Header ( "simpSessionId" ) String sessionId ) {
  System.out.println( "(RequestMapping) disconnect: " + sessionId );
  sessionService.deregisterPlayer( sessionId );
 }

 // √ Receive answers
 @MessageMapping ( "/user/{gameId}/{playerId}" )
 @SendTo ( "/topic/user/{gameId}/{playerId}" )
 public QuestionDtoList receiveAnswer (
         @DestinationVariable UUID gameId,
         @DestinationVariable UUID playerId,
         AnswerDto answerDto ) {
  return handleService.receiveAnswer( gameId, playerId, answerDto )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "The Answer could not be processed" ) );
 }
}
