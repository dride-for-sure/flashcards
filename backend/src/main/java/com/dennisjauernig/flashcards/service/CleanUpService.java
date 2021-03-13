package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.db.SessionDb;
import com.dennisjauernig.flashcards.model.Game;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CleanUpService {

 private final SessionDb sessionDb;
 private final MessagingService messagingService;
 private final GamesService gamesService;

 public CleanUpService (
         SessionDb sessionDb,
         MessagingService messagingService,
         GamesService gamesService ) {
  this.sessionDb = sessionDb;
  this.messagingService = messagingService;
  this.gamesService = gamesService;
 }

 // √ Remove all games, that have no playerIds within the sessionDb
 public Object cleanUpEmptyGames () {
  List<UUID> playerIds = new ArrayList<>( sessionDb.listSessionIds().values() );
  List<Game> gameList = gamesService.listGames();
  for ( Game game : gameList ) {
   long count = game.getPlayerList()
                    .stream()
                    .filter( player -> playerIds.contains( player.getId() ) )
                    .count();
   if ( count == 0 ) {
    gamesService.deleteGameById( game.getId() );
   } else if ( !playerIds.contains( game.getMaster().getId() ) ) {
    promotePlayerToGameMaster( playerIds, game );
   }
  }
  messagingService.broadcastGameDtoList( gamesService.listAvailableGames() );
  return null;
 }

 private void promotePlayerToGameMaster ( List<UUID> playerIds, Game game ) {
  Game cleanedGame = game.toBuilder()
                         .playerList( game.getPlayerList().stream()
                                          .filter( player -> playerIds.contains( player.getId() ) )
                                          .collect( Collectors.toList() ) )
                         .build();
  Game gameWithNewMaster = gamesService.promoteRandomPlayerToGameMaster( cleanedGame );
  messagingService.broadcastGameDto( gameWithNewMaster );
 }
}
