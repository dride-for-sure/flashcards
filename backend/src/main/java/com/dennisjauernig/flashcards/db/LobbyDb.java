package com.dennisjauernig.flashcards.db;

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

 public Lobby addPlayerToLobby ( Player newPlayer ) {
  List<Player> playerInLobby = this.lobbyDb.getPlayers();
  playerInLobby.add( newPlayer );
  this.lobbyDb = Lobby.builder()
                      .uuid( lobbyDb.getUuid() )
                      .players( playerInLobby )
                      .build();
  return this.lobbyDb;
 }

 public boolean hasLobbyPlayer ( UUID playerUuid ) {
  return this.lobbyDb.getPlayers().stream()
                     .anyMatch( existingPlayer -> existingPlayer.getUuid()
                                                                .equals( playerUuid ) );
 }

 public List<Player> getGamePlayer () {
  return this.lobbyDb.getPlayers();
 }

 public void resetLobby () {
  this.lobbyDb = new Lobby( UUID.randomUUID(), new ArrayList<>() );
 }
}
