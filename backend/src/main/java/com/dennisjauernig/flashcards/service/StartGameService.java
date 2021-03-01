package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.StartGameDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.db.PlayerDb;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.repository.CardsDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StartGameService {

 public final CardsDb cardsDb;
 private final GamesDb gamesDb;
 private final PlayerDb playerDb;

 @Autowired
 public StartGameService ( PlayerDb playerDb, GamesDb gamesDb, CardsDb cardsDb ) {
  this.playerDb = playerDb;
  this.gamesDb = gamesDb;
  this.cardsDb = cardsDb;
 }

 public Optional<Game> startGame ( StartGameDto dto, String gameId, Difficulty difficulty ) {
  if ( !this.gamesDb.hasGame( gameId )
          && dto.getStart()
          && this.playerDb.existsById( dto.getMaster().getId() )
  ) {
   return Optional.of( this.gamesDb.addGame(
           Game.builder()
               .id( gameId )
               .difficulty( difficulty )
               .status( GameStatus.WAITING )
               .master( dto.getMaster() )
               .build() ) );
  }
  return Optional.empty();
 }
}

