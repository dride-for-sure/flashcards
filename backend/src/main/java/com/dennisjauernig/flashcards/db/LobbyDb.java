package com.dennisjauernig.flashcards.db;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.model.Lobby;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class LobbyDb {

 private Lobby lobbyDb = new Lobby( UUID.randomUUID(), new ArrayList<>() );

 public Lobby getLobby () {
  return this.lobbyDb;
 }

 public UUID getLobbyUuid () {
  return this.lobbyDb.getUuid();
 }

 public Lobby addPlayerToLobby ( NewPlayerDto dto ) {
  List<Player> playerInLobby = this.lobbyDb.getPlayers();
  playerInLobby.add( Player.builder()
                           .uuid( dto.getUuid() )
                           .name( dto.getName() )
                           .cardsSolved( 0 )
                           .points( 0 )
                           .build() );
  this.lobbyDb = new Lobby( this.lobbyDb.getUuid(), playerInLobby );
  return this.lobbyDb;
 }

 public boolean hasLobbyPlayer ( NewPlayerDto dto ) {
  return this.lobbyDb.getPlayers().stream()
                     .anyMatch( existingPlayer -> existingPlayer.getUuid()
                                                                .equals( dto.getUuid() ) );
 }

 public List<Player> getGamePlayer () {
  return this.lobbyDb.getPlayers();
 }

 public void resetLobby () {
  this.lobbyDb = new Lobby( UUID.randomUUID(), new ArrayList<>() );
 }
}
