package com.dennisjauernig.flashcards.db;

import com.dennisjauernig.flashcards.controller.model.AddPlayerDto;
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
	return lobbyDb;
 }

 public UUID getLobbyUuid () {
	return lobbyDb.getUuid();
 }

 public void addPlayerToLobby (AddPlayerDto dto) {
	List<Player> playerInLobby = lobbyDb.getPlayers();
	playerInLobby.add( Player.builder()
														 .uuid( dto.getUuid() )
														 .name( dto.getName() )
														 .cardsSolved( 0 )
														 .points( 0 )
														 .build() );
	lobbyDb = new Lobby( lobbyDb.getUuid(), playerInLobby );
 }

 public boolean hasLobbyPlayer (AddPlayerDto dto) {
	return lobbyDb.getPlayers().stream()
								 .anyMatch( existingPlayer -> existingPlayer.getUuid().equals( dto.getUuid() ) );
 }

 public List<Player> getGamePlayer () {
	return lobbyDb.getPlayers();
 }

 public void resetLobby () {
	lobbyDb = new Lobby( UUID.randomUUID(), new ArrayList<>() );
 }
}
