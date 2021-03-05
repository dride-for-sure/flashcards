package com.dennisjauernig.flashcards.db;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Repository
public class SessionDb {

 private final Map<String, UUID> sessionDb = new HashMap<>();

 // √ Save sessionIds
 public void saveSession ( String sessionId, UUID gameId ) {
  sessionDb.put( sessionId, gameId );
  System.out.println( sessionDb );
 }

 // √ Delete sessionIds
 public void deleteBySessionId ( String sessionId ) {
  sessionDb.remove( sessionId );
  System.out.println( sessionDb );
 }

 // √ List sessionIds
 public Map<String, UUID> listSessionIds () {
  return sessionDb;
 }
}
