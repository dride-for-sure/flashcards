package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.GameStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LobbyService {

 private final GamesDb gamesDb;

 public LobbyService ( GamesDb gamesDb ) {
  this.gamesDb = gamesDb;
 }

 public List<GameDto> listOpenGames () {
  return gamesDb.listGames().stream()
                .filter( game -> game.getStatus().equals( GameStatus.PREPARE ) )
                .map( openGame -> openGame.convertToDto() )
                .collect( Collectors.toList() );
 }
}
