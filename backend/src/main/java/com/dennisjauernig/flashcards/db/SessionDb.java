package com.dennisjauernig.flashcards.db;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SessionDb {

 private final Map<String, UUID> sessionDb = new HashMap<>();

 // √ Save sessionIds
 public void saveSession ( String sessionId, UUID playerId ) {
  sessionDb.put( sessionId, playerId );
 }

 // √ Get playerId by sessionId
 public Optional<UUID> getPlayerIdBySessionId ( String sessionId ) {
  return sessionDb.containsKey( sessionId )
          ? Optional.of( sessionDb.get( sessionId ) )
          : Optional.empty();
 }

 // √ Delete sessionIds
 public void deleteBySessionId ( String sessionId ) {
  sessionDb.remove( sessionId );
 }

 // √ List sessionIds
 public Map<String, UUID> listSessionIds () {
  return sessionDb;
 }
}
