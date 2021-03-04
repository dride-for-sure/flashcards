package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public MessagingService (
         SimpMessagingTemplate simpMessagingTemplate ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
 }

 // Send updates to specific player
 public void sendToPlayer ( Principal principal, GameDetailsDto gameDetailsDto ) {
  simpMessagingTemplate.convertAndSendToUser( principal.getName(), "/topic/updates", gameDetailsDto );
 }

}
