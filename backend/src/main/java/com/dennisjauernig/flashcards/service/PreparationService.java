package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PreparationService {

 public final QuestionDb questionDb;
 private final GamesDb gamesDb;
 private final MessagingService messagingService;
 private final BuilderService builderService;

 @Autowired
 public PreparationService (
         GamesDb gamesDb,
         QuestionDb questionDb,
         MessagingService messagingService,
         BuilderService builderService ) {
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
  this.messagingService = messagingService;
  this.builderService = builderService;
 }

 public GameDto prepareGame (
         PlayerDto playerDto,
         String gameId,
         Difficulty difficulty ) {
  Optional<Game> game = gamesDb.getGame( gameId );
  GameDto newGame;
  if ( game.isEmpty() ) {
   newGame = gamesDb.addGame( builderService.gameBuilder( gameId, difficulty,
           playerDto ) ).convertToDto();
  } else {
   Player playerToAdd = builderService.playerBuilder( playerDto,
           game.get().getQuestionList() );
   newGame = gamesDb.updateGame( game.get().addPlayer( playerToAdd ) )
                    .convertToPlayerDto( playerToAdd.getId() );
  }
  messagingService.broadcastOpenGames( getOpenGames() );
  return newGame;
 }

 private List<GameDto> getOpenGames () {
  return gamesDb.listGames()
                .stream()
                .filter( game -> game.getStatus().equals( GameStatus.PREPARE ) )
                .map( openGame -> openGame.convertToDto() )
                .collect( Collectors.toList() );
 }
}

