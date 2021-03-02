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

 public Optional<Game> getGame ( String id ) {
  return gamesDb.stream()
                .filter( game -> game.getId().equals( id ) )
                .findAny();
 }

 public Game addGame ( Game gameToAdd ) {
  gamesDb.add( gameToAdd );
  return gameToAdd;
 }

 public Game updateGame ( Game gameToUpdate ) {
  this.gamesDb = this.gamesDb.stream()
                             .map( game -> game.getId().equals( gameToUpdate.getId() )
                                     ? gameToUpdate : game )
                             .collect( Collectors.toList() );
  return gameToUpdate;
 }

 public List<Game> listGames () {
  return gamesDb;
 }
}
