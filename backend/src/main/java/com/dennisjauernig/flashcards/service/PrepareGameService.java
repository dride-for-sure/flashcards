package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.PlayerJoinsGameDto;
import com.dennisjauernig.flashcards.controller.model.PrepareGameDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.repository.PlayerDb;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrepareGameService {

 public final QuestionDb questionDb;
 private final GamesDb gamesDb;
 private final PlayerDb playerDb;

 @Autowired
 public PrepareGameService ( PlayerDb playerDb, GamesDb gamesDb, QuestionDb questionDb ) {
  this.playerDb = playerDb;
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
 }

 public Optional<PrepareGameDto> prepareGame (
         PlayerJoinsGameDto dto,
         String gameId,
         Difficulty difficulty ) {
  Optional<PlayerDto> playerJoinsGame = this.playerDb.findById( dto.getId() );

  if ( !this.gamesDb.hasGame( gameId ) && playerJoinsGame.isPresent() ) {
   Game newGame = buildNewGame( gameId, difficulty, playerJoinsGame.get() );
   this.gamesDb.addGame( newGame );
   return Optional.of( buildPrepareGameDto( newGame ) );
  }

  if ( this.gamesDb.hasGame( gameId ) && playerJoinsGame.isPresent() ) {
   Game updatedGame = addPlayerToGame(
           this.gamesDb.getGame( gameId ).get(),
           playerJoinsGame.get() );
   this.gamesDb.updateGame( updatedGame );
   return Optional.of( buildPrepareGameDto( updatedGame ) );
  }
  return Optional.empty();
 }

 private Game addPlayerToGame ( Game existingGame, PlayerDto playerJoinsGame ) {
  Player playerToAdd = buildPlayer( playerJoinsGame, existingGame.getQuestionList() );
  return existingGame.toBuilder()
                     .playerList( existingGame.getPlayerList()
                                              .stream()
                                              .map( player -> {
                                               if ( player.getId().equals( playerToAdd.getId() ) ) {
                                                return playerToAdd;
                                               }
                                               return player;
                                              } )
                                              .collect( Collectors.toList() ) )
                     .build();
 }

 private PrepareGameDto buildPrepareGameDto ( Game game ) {
  List<PlayerDto> playerDtoList = game.getPlayerList().stream()
                                      .map( player -> PlayerDto.builder()
                                                               .id( player.getId() )
                                                               .name( player.getName() )
                                                               .build() )
                                      .collect( Collectors.toList() );
  return PrepareGameDto.builder()
                       .id( game.getId() )
                       .difficulty( game.getDifficulty() )
                       .status( game.getStatus() )
                       .master( game.getMaster() )
                       .playerDtoList( playerDtoList )
                       .build();
 }

 private Game buildNewGame (
         String gameId,
         Difficulty difficulty,
         PlayerDto playerJoinsGame
 ) {
  List<Question> questionsList = generateQuestionList( difficulty );
  Player player = buildPlayer( playerJoinsGame, questionsList );
  return Game.builder()
             .id( gameId )
             .difficulty( difficulty )
             .status( GameStatus.PREPARE )
             .master( GameMaster.builder()
                                .id( playerJoinsGame.getId() )
                                .name( playerJoinsGame.getName() )
                                .build() )
             .playerList( new ArrayList<>( Collections.singletonList( player ) ) )
             .questionList( questionsList )
             .build();
 }

 private List<Question> generateQuestionList ( Difficulty difficulty ) {
  return this.questionDb.findAll().stream().filter( question -> {
   if ( difficulty.equals( Difficulty.EASY ) ) {
    return question.getDifficulty().equals( Difficulty.EASY );
   } else if ( difficulty.equals( Difficulty.MODERATE ) ) {
    return question.getDifficulty().equals( Difficulty.EASY )
            || question.getDifficulty().equals( Difficulty.MODERATE );
   }
   return true;
  } ).collect( Collectors.toList() );
 }

 private Player buildPlayer ( PlayerDto playerJoinsGame, List<Question> questionsList ) {
  return Player.builder()
               .id( playerJoinsGame.getId() )
               .name( playerJoinsGame.getName() )
               .questionList( questionsList.stream()
                                           .map( question -> QuestionDto.builder()
                                                                        .id( question.getId() )
                                                                        .status( QuestionStatus.NONE )
                                                                        .difficulty( question.getDifficulty() )
                                                                        .category( question.getCategory() )
                                                                        .question( question.getQuestion() )
                                                                        .answers( question.getAnswers() )
                                                                        .build() )
                                           .collect( Collectors.toList() ) )
               .build();
 }
}

