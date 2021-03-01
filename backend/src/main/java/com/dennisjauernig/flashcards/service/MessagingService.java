package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public MessagingService ( SimpMessagingTemplate simpMessagingTemplate ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
 }

 public void sendGameUpdates ( Game game ) {
  simpMessagingTemplate.convertAndSend(
          "/api/games/" + game.getDifficulty() + "/" + game.getId(), game );
 }
}
