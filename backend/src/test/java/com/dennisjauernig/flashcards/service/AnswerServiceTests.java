package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.db.LobbyDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.repository.CardsDb;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.mock;

public class AnswerServiceTests {

 private final GamesDb gamesDb = mock( GamesDb.class );
 private final LobbyDb lobbyDb = mock( LobbyDb.class );
 private final CardsDb cardsDb = mock( CardsDb.class );
 private final InitGameService initGameService = new InitGameService( lobbyDb, gamesDb, cardsDb );

 @Test
 @DisplayName ( "Init a new game with cards level 1-3" )
 public void initNewGame () {
  // GIVEN
  UUID gameUuid = UUID.randomUUID();
  int level = 3;

  // WHEN
  Game actualGame = initGameService.initGame( dto ).get();

  // THEN
  Game expectedGame =
          assertThat( actualGame, is( expectedGame ) );
 }

 @Test
 @DisplayName ( "Init a new game with cards level 1 only" )
 public void initNewGame () {

 }

 @Test
 @DisplayName ( "Init an already existing game" )
 public void initGameTwice () {

 }

 @Test
 @DisplayName ( "Try to init a game with an id different from lobby id" )
 public void initGameWithWrongId () {

 }

}
