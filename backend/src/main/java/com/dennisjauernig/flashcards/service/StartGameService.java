package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.Game;
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
  System.out.println( gameToStart );
  if ( gameToStart.getMaster().getId().equals( playerId ) ) {
   Game startedGame = gamesDb.updateGame( gameToStart.start() );
   messagingService.broadcastGameUpdatesToPlayer( startedGame );
  } else {
   throw new IllegalArgumentException( "PlayerId: " + playerId + " doesnt exists" );
  }
 }
}
