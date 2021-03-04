package com.dennisjauernig.flashcards.controller.service;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.repository.GamesDb;
import com.dennisjauernig.flashcards.service.GamesStatusService;
import com.dennisjauernig.flashcards.service.MessagingService;
import org.springframework.stereotype.Service;

@Service
public class StartGameService {

 private final MessagingService messagingService;
 private final GamesStatusService gamesStatusService;
 private final GamesDb gamesDb;

 public StartGameService (
         MessagingService messagingService,
         GamesStatusService gamesStatusService,
         GamesDb gamesDb ) {
  this.messagingService = messagingService;
  this.gamesStatusService = gamesStatusService;
  this.gamesDb = gamesDb;
 }

 public void startGame ( String gameId, String playerId ) {
  Game gameToStart = gamesDb.findById( gameId )
                            .orElseThrow( () ->
                                    new IllegalArgumentException( "GameId: " + gameId + " doesnt exists" ) );
  if ( gameToStart.getMaster().getId().equals( playerId ) ) {
   Game startedGame = gamesDb.save( gamesStatusService.start( gameToStart ) );
   messagingService.broadcastGameUpdatesToPlayer( startedGame );
  } else {
   throw new IllegalArgumentException( "PlayerId: " + playerId + " doesnt exists" );
  }
 }
}
