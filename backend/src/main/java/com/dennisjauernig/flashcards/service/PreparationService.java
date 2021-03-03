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
  Game newGame;
  if ( game.isEmpty() ) {
   newGame = gamesDb.addGame( builderService.gameBuilder( gameId, difficulty, playerDto ) );
  } else {
   Player playerToAdd = builderService.playerBuilder( playerDto, game.get().getQuestionList() );
   newGame = gamesDb.updateGame( game.get().addPlayer( playerToAdd ) );
  }
  messagingService.broadcastOpenGames( getOpenGames() );
  return handleGameConversion( playerDto, newGame );
 }

 private GameDto handleGameConversion ( PlayerDto playerDto, Game newGame ) {
  return newGame.getStatus().equals( GameStatus.PREPARE )
          ? newGame.convertToDto()
          : newGame.convertToPlayerDto( playerDto.getId() );
 }

 private List<GameDto> getOpenGames () {
  return gamesDb.listGames()
                .stream()
                .filter( game -> game.getStatus().equals( GameStatus.PREPARE ) )
                .map( openGame -> openGame.convertToDto() )
                .collect( Collectors.toList() );
 }
}

