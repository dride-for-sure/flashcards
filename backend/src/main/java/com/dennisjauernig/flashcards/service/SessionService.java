package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.config.GameConfig;
import com.dennisjauernig.flashcards.db.SessionDb;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SessionService {

 private final SessionDb sessionDb;
 private final CleanUpService cleanUpService;
 private final ExecutorService executorService;
 private final GameConfig gameConfig;

 public SessionService (
         SessionDb sessionDb,
         CleanUpService cleanUpService,
         ExecutorService executorService,
         GameConfig gameConfig
 ) {
  this.sessionDb = sessionDb;
  this.cleanUpService = cleanUpService;
  this.executorService = executorService;
  this.gameConfig = gameConfig;
 }

 // √ Add player to sessionDb
 public void registerNewPLayer ( String sessionId, UUID gameId ) {
  sessionDb.saveSession( sessionId, gameId );
 }

 // √ Remove player from sessionDb
 public void deregisterPlayer ( String sessionId ) {
  sessionDb.deleteBySessionId( sessionId );
  executorService.scheduleTask( () -> cleanUpService.cleanUpEmptyGames(), gameConfig.getDeleteGamesDelay() );
 }
}