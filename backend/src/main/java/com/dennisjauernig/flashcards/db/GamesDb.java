package com.dennisjauernig.flashcards.db;

import com.dennisjauernig.flashcards.model.Game;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class GamesDb {

 private List<Game> gamesDb = new ArrayList<>();

 public boolean hasGame ( String id ) {
  return gamesDb.stream()
                .anyMatch( game -> game.getId().equals( id ) );
 }

 public Optional<Game> getGame ( String id ) {
  return gamesDb.stream()
                .filter( game -> game.getId().equals( id ) )
                .findAny();
 }

 public Game addGame ( Game prepareGameDTO ) {
  gamesDb.add( prepareGameDTO );
  return prepareGameDTO;
 }

 public void updateGame ( Game updatedGame ) {
  this.gamesDb = this.gamesDb.stream()
                             .map( game -> game.getId().equals( updatedGame.getId() )
                                     ? updatedGame : game )
                             .collect( Collectors.toList() );
 }

 public void deleteGame ( String id ) {
  this.gamesDb = this.gamesDb.stream()
                             .filter( game -> !game.getId().equals( id ) )
                             .collect( Collectors.toList() );
 }

 public List<Game> listGames () {
  return gamesDb;
 }
}
