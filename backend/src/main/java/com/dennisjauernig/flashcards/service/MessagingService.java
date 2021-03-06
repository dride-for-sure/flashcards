package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.GameDtoList;
import com.dennisjauernig.flashcards.controller.model.QuestionDtoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public MessagingService (
         SimpMessagingTemplate simpMessagingTemplate ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
 }

 // √ Broadcast all open games to the lobby
 public void broadcastGameDtoToLobby ( GameDtoList gameDtoList ) {
  System.out.println( "Broadcast gameDto to lobby" );
  simpMessagingTemplate.convertAndSend( "/topic/games", gameDtoList );
 }

 // √ Broadcast the gameDto to all player within this game
 public void broadcastGameDtoToPlayer ( GameDto gameDto ) {
  System.out.println( "Broadcast gameDto to player" );
  simpMessagingTemplate.convertAndSend( "/topic/game/" + gameDto.getId(), gameDto );
 }

 // √ Broadcast the questionDtoList to a specific player
 public void broadcastQuestionDtoListToPlayer (
         UUID playerId,
         UUID gameId,
         QuestionDtoList questionDtoList ) {
  System.out.println( "Broadcast QuestionDtoList to player" );
  simpMessagingTemplate.convertAndSend( "/topic/user/" + gameId + "/" + playerId, questionDtoList );
 }
}