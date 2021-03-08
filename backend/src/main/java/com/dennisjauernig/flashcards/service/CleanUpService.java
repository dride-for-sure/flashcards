package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDtoList;
import com.dennisjauernig.flashcards.db.SessionDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CleanUpService {

 private final SessionDb sessionDb;
 private final GamesDb gamesDb;
 private final MessagingService messagingService;
 private final GamesService gamesService;

 public CleanUpService (
         SessionDb sessionDb,
         GamesDb gamesDb,
         MessagingService messagingService,
         GamesService gamesService ) {
  this.sessionDb = sessionDb;
  this.gamesDb = gamesDb;
  this.messagingService = messagingService;
  this.gamesService = gamesService;
 }

 // √ Remove all games, that have no playerIds within the sessionDb
 public Object cleanUpEmptyGames () {
  Map<String, UUID> sessionMap = sessionDb.listSessionIds();
  List<Game> gameList = gamesDb.findAll();
  for ( Game game : gameList ) {
   if ( !sessionMap.containsValue( game.getId() ) ) {
    gamesDb.deleteById( game.getId() );
    GameDtoList gameDtoList =
            GameDtoList.builder()
                       .gameDtoList( gamesService.listAvailableGames() )
                       .build();
    messagingService.broadcastGameDtoToLobby( gameDtoList );
    System.out.println( "Game deleted: " + game.getId() );
   }
  }
  return null;
 }
}
