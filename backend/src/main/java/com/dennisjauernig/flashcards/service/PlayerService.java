package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.NewPlayerDto;
import com.dennisjauernig.flashcards.controller.model.OpenGameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.repository.PlayerDb;
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

 public List<OpenGameDto> registerPlayer ( NewPlayerDto dto ) {
  if ( !this.playerDb.existsById( dto.getId() ) ) {
   this.playerDb.save( PlayerDto.builder()
                                .id( dto.getId() )
                                .name( dto.getName() )
                                .build() );
  }
  return openGameDtoFactory();
 }

 private List<OpenGameDto> openGameDtoFactory () {
  return gamesDb.listGames().stream()
                .filter( game -> game.getStatus().equals( GameStatus.PREPARE ) )
                .map( openGame -> OpenGameDto.builder()
                                             .id( openGame.getId() )
                                             .difficulty( openGame.getDifficulty() )
                                             .status( openGame.getStatus() )
                                             .master( openGame.getMaster() )
                                             .playerCount( openGame.getPlayerList().size() )
                                             .build() )
                .collect( Collectors.toList() );
 }
}
