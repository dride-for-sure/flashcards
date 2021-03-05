package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public MessagingService (
         SimpMessagingTemplate simpMessagingTemplate ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
 }

 // √ Broadcast the gameDto to all player within this game
 public void broadcastGameDto ( GameDto gameDto ) {
  simpMessagingTemplate.convertAndSend( "/topic/game/" + gameDto.getId(), gameDto );
 }

 // √ Broadcast the questionDtoList to a specific player
 public void broadcastQuestionDtoList (
         UUID playerId,
         UUID gameId,
         List<QuestionDto> questionDtoList ) {
  simpMessagingTemplate.convertAndSend( "/topic/user/" + gameId + "/" + playerId, questionDtoList );
 }
}