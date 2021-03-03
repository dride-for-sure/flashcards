package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public MessagingService ( SimpMessagingTemplate simpMessagingTemplate ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
 }

 public void broadcastOpenGames ( List<GameDto> openGames ) {
  System.out.println( "Broadcast open games" );
  simpMessagingTemplate.convertAndSend( "/topic/games", openGames );
 }

 public void broadcastGameUpdatesToPlayer ( Game game ) {

  for ( Player player : game.getPlayerList() ) {
   String url = "/topic/games/" + game.getDifficulty()
                                      .toString() + "/" + game.getId() + "/" + player.getId();
   simpMessagingTemplate.convertAndSend( url,
           game.convertToPlayerDto( player.getId() ) );
   System.out.println( "Send updates to player" );
  }
 }
}
