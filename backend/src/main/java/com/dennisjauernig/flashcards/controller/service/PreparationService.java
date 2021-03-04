package com.dennisjauernig.flashcards.controller.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.repository.GamesDb;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import com.dennisjauernig.flashcards.service.GamesService;
import com.dennisjauernig.flashcards.service.MessagingService;
import com.dennisjauernig.flashcards.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PreparationService {

 public final QuestionDb questionDb;
 private final GamesDb gamesDb;
 private final GamesService gamesService;
 private final PlayerService playerService;
 private final MessagingService messagingService;

 @Autowired
 public PreparationService (
         GamesDb gamesDb,
         QuestionDb questionDb,
         GamesService gamesService,
         PlayerService playerService,
         MessagingService messagingService ) {
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
  this.gamesService = gamesService;
  this.playerService = playerService;
  this.messagingService = messagingService;
 }

 public GameDto prepareGame (
         PlayerDto playerDto,
         String gameId,
         Difficulty difficulty ) {
  Optional<Game> game = gamesDb.findById( gameId );
  Game newGame;
  if ( game.isEmpty() ) {
   newGame = gamesDb.save( gamesService.generateNewGame( gameId, difficulty, playerDto ) );

  } else {
   Player playerToAdd = playerService.generateNewPlayer( playerDto, game.get().getQuestionList() );
   newGame = gamesDb.save( gamesService.addPlayerToGame( game.get(), playerToAdd ) );
  }
  messagingService.broadcastOpenGames( gamesService.listOpenGames() );
  return handleGameConversion( playerDto, newGame );
 }

 private GameDto handleGameConversion ( PlayerDto playerDto, Game game ) {
  return game.getStatus().equals( GameStatus.PREPARE )
          ? gamesService.convertGameToDto( game )
          : gamesService.convertGameToDetailsDto( game, playerDto.getId() );
 }
}

