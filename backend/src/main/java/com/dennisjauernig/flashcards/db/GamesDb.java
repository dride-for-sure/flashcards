package com.dennisjauernig.flashcards.db;

import com.dennisjauernig.flashcards.model.Game;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class GamesDb {

 private List<Game> gamesDb = new ArrayList<>();

 public boolean hasGame ( UUID uuid ) {
  return gamesDb.stream()
                .anyMatch( game -> game.getGameUuid().equals( uuid ) );
 }

 public Optional<Game> getGame ( UUID uuid ) {
  return gamesDb.stream()
                .filter( game -> game.getGameUuid().equals( uuid ) )
                .findAny();
 }

 public Game addGame ( Game game ) {
  gamesDb.add( game );
  return game;
 }

 public void updateGame ( Game updatedGame ) {
  this.gamesDb = this.gamesDb.stream()
                             .map( game -> game.getGameUuid().equals( updatedGame.getGameUuid() )
                                     ? updatedGame : game )
                             .collect( Collectors.toList() );
 }

 public void deleteGame ( UUID uuid ) {
  this.gamesDb = this.gamesDb.stream()
                             .filter( game -> !game.getGameUuid().equals( uuid ) )
                             .collect( Collectors.toList() );
 }

 public List<Game> listGames () {
  return gamesDb;
 }
}
