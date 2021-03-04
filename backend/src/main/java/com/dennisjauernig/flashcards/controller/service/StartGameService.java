package com.dennisjauernig.flashcards.controller.service;

import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.service.MessagingService;
import org.springframework.stereotype.Service;

@Service
public class StartGameService {

 private final MessagingService messagingService;
 private final GamesDb gamesDb;

 public StartGameService ( MessagingService messagingService, GamesDb gamesDb ) {
  this.messagingService = messagingService;
  this.gamesDb = gamesDb;
 }

 public void startGame ( String gameId, String playerId ) {
  Game gameToStart = gamesDb.getGame( gameId )
                            .orElseThrow( () ->
                                    new IllegalArgumentException( "GameId: " + gameId + " doesnt exists" ) );
  if ( gameToStart.getMaster().getId().equals( playerId ) ) {
   Game startedGame = gamesDb.updateGame( gameToStart.start() );
   messagingService.broadcastGameUpdatesToPlayer( startedGame );
  } else {
   throw new IllegalArgumentException( "PlayerId: " + playerId + " doesnt exists" );
  }
 }
}
