package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.db.PlayerDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

 private final PlayerDb playerDb;
 private final GamesDb gamesDb;

 public PlayerService ( PlayerDb playerDb, GamesDb gamesDb ) {
  this.playerDb = playerDb;
  this.gamesDb = gamesDb;
 }

 public List<Game> registerPlayer ( NewPlayerDto dto ) {
  if ( !this.playerDb.existsById( dto.getId() ) ) {
   this.playerDb.save( Player.builder()
                             .id( dto.getId() )
                             .name( dto.getName() )
                             .build() );
  }
  return gamesDb.listGames().stream()
                .filter( game -> game.getStatus().equals( GameStatus.WAITING ) )
                .collect( Collectors.toList() );
 }
}
