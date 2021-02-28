package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.db.LobbyDb;
import com.dennisjauernig.flashcards.model.Lobby;
import com.dennisjauernig.flashcards.model.Player;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class LobbyServiceTests {

 private final LobbyDb lobbyDb = mock( LobbyDb.class );
 private final LobbyService lobbyService = new LobbyService( lobbyDb );

 @Test
 @DisplayName ( "Add new player to lobby" )
 public void addValidPlayerToLobby () {
  // GIVEN
  UUID playerUuid = UUID.randomUUID();
  UUID lobbyUuid = UUID.randomUUID();
  String playerName = "Karl";
  NewPlayerDto dto = NewPlayerDto.builder()
                                 .uuid( playerUuid )
                                 .name( playerName )
                                 .build();
  Player playerToAdd = Player.builder()
                             .uuid( playerUuid )
                             .name( playerName )
                             .cardsSolved( 0 )
                             .points( 0 )
                             .build();
  List<Player> playerList = new ArrayList<>();
  playerList.add( playerToAdd );
  Lobby returnedLobby = Lobby.builder().uuid( lobbyUuid ).players( playerList ).build();

  when( lobbyDb.hasLobbyPlayer( playerUuid ) ).thenReturn( false );
  when( lobbyDb.addPlayerToLobby( playerToAdd ) ).thenReturn( returnedLobby );


  //WHEN
  Lobby actualLobby = lobbyService.addPlayerToLobby( dto ).get();

  //THEN
  List<Player> expectedPlayerList = new ArrayList<>();
  expectedPlayerList.add( playerToAdd );
  Lobby expectedLobby = Lobby.builder().uuid( lobbyUuid ).players( expectedPlayerList ).build();

  assertThat( actualLobby, is( expectedLobby ) );
  verify( lobbyDb ).hasLobbyPlayer( playerUuid );
  verify( lobbyDb ).addPlayerToLobby( playerToAdd );
 }

 @Test
 @DisplayName ( "Add existing player to lobby" )
 public void addInvalidPlayerToLobby () {
  // GIVEN
  UUID playerUuid = UUID.randomUUID();
  UUID lobbyUuid = UUID.randomUUID();
  String playerName = "Karl";
  NewPlayerDto dto = NewPlayerDto.builder()
                                 .uuid( playerUuid )
                                 .name( playerName )
                                 .build();
  Player playerToAdd = Player.builder()
                             .uuid( playerUuid )
                             .name( playerName )
                             .cardsSolved( 0 )
                             .points( 0 )
                             .build();
  List<Player> playerList = new ArrayList<>();
  playerList.add( playerToAdd );
  Lobby returnedLobby = Lobby.builder().uuid( lobbyUuid ).players( playerList ).build();

  when( lobbyDb.hasLobbyPlayer( playerUuid ) ).thenReturn( true );

  //WHEN
  Optional<Lobby> actualLobby = lobbyService.addPlayerToLobby( dto );

  //THEN
  assertTrue( actualLobby.isEmpty() );
  verify( lobbyDb ).hasLobbyPlayer( playerUuid );
  verify( lobbyDb, never() ).addPlayerToLobby( any() );
 }

}
