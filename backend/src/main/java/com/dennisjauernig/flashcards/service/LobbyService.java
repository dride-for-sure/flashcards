package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.db.LobbyDb;
import com.dennisjauernig.flashcards.model.Lobby;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LobbyService {

 private final LobbyDb lobbyDb;

 public LobbyService ( LobbyDb lobbyDb ) {
  this.lobbyDb = lobbyDb;
 }

 public Optional<Lobby> addPlayerToLobby ( NewPlayerDto dto ) {
  if ( !this.lobbyDb.hasLobbyPlayer( dto.getUuid() ) ) {
   Player playerToAdd = Player.builder()
                              .uuid( dto.getUuid() )
                              .name( dto.getName() )
                              .points( 0 )
                              .cardsSolved( 0 )
                              .build();
   return Optional.of( this.lobbyDb.addPlayerToLobby( playerToAdd ) );
  }
  return Optional.empty();
 }
}
