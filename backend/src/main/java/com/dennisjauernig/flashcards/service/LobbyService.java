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
 private final MessagingService messagingService;

 public LobbyService ( GamesDb gamesDb, MessagingService messagingService ) {
  this.gamesDb = gamesDb;
  this.messagingService = messagingService;
 }

 public List<GameDto> listOpenGames () {
  return gamesDb.listGames().stream()
                .filter( game -> game.getStatus().equals( GameStatus.PREPARE ) )
                .map( openGame -> openGame.convertToDto() )
                .collect( Collectors.toList() );
 }

 public void broadcastOpenGames () {
  messagingService.broadcastOpenGames( listOpenGames() );
 }
}
