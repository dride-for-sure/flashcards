package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerJoinsGameDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PreparationService {

 public final QuestionDb questionDb;
 private final GamesDb gamesDb;
 private final LobbyService lobbyService;
 private final BuilderService builderService;

 @Autowired
 public PreparationService (
         GamesDb gamesDb,
         QuestionDb questionDb,
         LobbyService lobbyService,
         BuilderService builderService ) {
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
  this.lobbyService = lobbyService;
  this.builderService = builderService;
 }

 public GameDto prepareGame (
         PlayerJoinsGameDto playerJoinsGameDto,
         String gameId,
         Difficulty difficulty ) {
  Optional<Game> game = gamesDb.getGame( gameId );
  Game newGame;
  if ( game.isEmpty() ) {
   newGame = gamesDb.addGame( builderService.gameBuilder( gameId, difficulty,
           playerJoinsGameDto ) );
  } else {
   Player playerToAdd = builderService.playerBuilder( playerJoinsGameDto,
           game.get().getQuestionList() );
   newGame = gamesDb.updateGame( game.get().addPlayer( playerToAdd ) );
  }
  lobbyService.broadcastOpenGames();
  return newGame.convertToDto();
 }
}

