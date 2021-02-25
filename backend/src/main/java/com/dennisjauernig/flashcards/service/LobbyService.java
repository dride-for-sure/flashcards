package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.AddPlayerDto;
import com.dennisjauernig.flashcards.db.LobbyDb;
import com.dennisjauernig.flashcards.model.Lobby;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LobbyService {

 private final LobbyDb lobbyDb;

 public LobbyService (LobbyDb lobbyDb) {
	this.lobbyDb = lobbyDb;
 }

 public Optional<Lobby> addPlayerToLobby (AddPlayerDto dto) {
	if ( !lobbyDb.hasLobbyPlayer( dto ) ) {
	 lobbyDb.addPlayerToLobby( dto );
	 return Optional.of( lobbyDb.getLobby() );
	}
	return Optional.empty();
 }
}
