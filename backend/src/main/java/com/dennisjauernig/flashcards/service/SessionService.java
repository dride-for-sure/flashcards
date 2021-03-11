package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.db.SessionDb;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SessionService {

 private final SessionDb sessionDb;

 public SessionService ( SessionDb sessionDb ) {
  this.sessionDb = sessionDb;
 }

 // √ Add player to sessionDb
 public void registerNewPLayer ( String sessionId, UUID playerId ) {
  sessionDb.saveSession( sessionId, playerId );
 }

 // √ Remove player from sessionDb
 public void deregisterPlayer ( String sessionId ) {
  sessionDb.deleteBySessionId( sessionId );
 }

 // √ Get playerId with SessionId
 public Optional<UUID> getPlayerIdBySessionId ( String sessionId ) {
  return sessionDb.getPlayerIdBySessionId( sessionId );
 }
}