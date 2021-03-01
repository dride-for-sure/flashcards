package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.db.LobbyDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LobbyService {

 private final LobbyDb lobbyDb;
 private final GamesDb gamesDb;

 public LobbyService ( LobbyDb lobbyDb, GamesDb gamesDb ) {
  this.lobbyDb = lobbyDb;
  this.gamesDb = gamesDb;
 }

 public List<Game> registerPlayer ( NewPlayerDto dto ) {
  if ( !this.lobbyDb.hasLobbyPlayer( UUID.fromString( dto.getId() ) ) ) {
   this.lobbyDb.addPlayerToLobby( Player.builder()
                                        .id( dto.getId() )
                                        .name( dto.getName() )
                                        .build() );
  }
  return gamesDb.listGames().stream()
                .filter( game -> game.getStatus().equals( GameStatus.WAITING ) )
                .collect( Collectors.toList() );
 }
}
