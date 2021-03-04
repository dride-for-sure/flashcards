package com.dennisjauernig.flashcards.controller.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.service.GamesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LobbyService {

 private final GamesService gamesService;

 public LobbyService ( GamesService gamesService ) {
  this.gamesService = gamesService;
 }

 public List<GameDto> listOpenGames () {
  return gamesService.listOpenGames();
 }
}
