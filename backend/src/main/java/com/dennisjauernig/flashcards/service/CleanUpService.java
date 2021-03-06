package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.db.SessionDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CleanUpService {

 private final SessionDb sessionDb;
 private final GamesDb gamesDb;

 public CleanUpService ( SessionDb sessionDb, GamesDb gamesDb ) {
  this.sessionDb = sessionDb;
  this.gamesDb = gamesDb;
 }

 // √ Remove all games, that have no playerIds within the sessionDb
 public void cleanUpEmptyGames () {
  Map<String, UUID> sessionMap = sessionDb.listSessionIds();
  List<Game> gameList = gamesDb.findAll();
  for ( Game game : gameList ) {
   if ( !sessionMap.containsValue( game.getId() )
           && isGameOldEnough( game ) ) {
    gamesDb.deleteById( game.getId() );
    System.out.println( "Game deleted: " + game.getId() );
   }
  }
 }

 // √ Check if game is older then 60 seconds
 private boolean isGameOldEnough ( Game game ) {
  long currentTimeStamp = Instant.now().getEpochSecond();
  long gameTimeStamp = game.getTimestamp();
  return gameTimeStamp + 30 < currentTimeStamp;
 }
}
