package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public MessagingService (
         SimpMessagingTemplate simpMessagingTemplate ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
 }

 public void sendToPlayer ( Principal principal, List<QuestionDto> questionDtoList ) {
  simpMessagingTemplate.convertAndSendToUser( principal.getName(), "/topic/updates", questionDtoList );
 }
}
