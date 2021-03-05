package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.db.SessionDb;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SessionService {

 private final SessionDb sessionDb;
 private final CleanUpService cleanUpService;

 public SessionService (
         SessionDb sessionDb, CleanUpService cleanUpService
 ) {
  this.sessionDb = sessionDb;
  this.cleanUpService = cleanUpService;
 }

 // √ Add player to sessionDb
 public void registerNewPLayer ( String sessionId, UUID gameId ) {
  sessionDb.saveSession( sessionId, gameId );
 }

 // √ Remove player from sessionDb
 public void removePlayer ( String sessionId ) {
  sessionDb.deleteBySessionId( sessionId );
  cleanUpService.cleanUpEmptyGames();
 }
}