package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDetailsDto;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GamesService {

 private final QuestionsService questionsService;
 private final PlayerService playerService;
 private final GamesDb gamesDb;

 @Autowired
 public GamesService (
         QuestionsService questionsService, PlayerService playerService,
         GamesDb gamesDb ) {
  this.questionsService = questionsService;
  this.playerService = playerService;
  this.gamesDb = gamesDb;
 }

 public List<GameDto> listOpenGames () {
  return gamesDb.findAllByStatusIs( GameStatus.PREPARE ).stream()
                .map( game -> convertGameToDto( game ) )
                .collect( Collectors.toList() );
 }

 public Game generateNewGame (
         String gameId,
         Difficulty difficulty,
         PlayerDto playerDto ) {
  List<Question> questionsList = questionsService.generateQuestionList( difficulty );
  Player player = playerService.generateNewPlayer( playerDto, questionsList );
  return Game.builder()
             .id( gameId )
             .difficulty( difficulty )
             .status( GameStatus.PREPARE )
             .master( GameMaster.builder()
                                .id( playerDto.getId() )
                                .name( playerDto.getName() )
                                .build() )
             .playerList( new ArrayList<>( Collections.singletonList( player ) ) )
             .questionList( questionsList )
             .build();
 }

 public GameDetailsDto convertGameToDetailsDto ( Game game, String playerId ) {
  List<QuestionDto> questionDtoList =
          game.getPlayerList()
              .stream()
              .filter( targetPlayer -> targetPlayer.getId().equals( playerId ) )
              .findFirst()
              .orElseThrow( () -> new IllegalArgumentException( "PlayerId: " + playerId + " does not exists" ) )
              .getQuestionDtoList();
  return GameDetailsDto.builder()
                       .id( game.getId() )
                       .difficulty( game.getDifficulty() )
                       .status( game.getStatus() )
                       .master( game.getMaster() )
                       .playerDtoList( game.getPlayerList()
                                           .stream()
                                           .map( player -> player.convertToDto() )
                                           .collect( Collectors.toList() ) )
                       .questionDtoList( questionsService.selectNextQuestion( questionDtoList ) )
                       .build();
 }

 public GameDto convertGameToDto ( Game game ) {
  return GameDto.builder()
                .id( game.getId() )
                .difficulty( game.getDifficulty() )
                .status( game.getStatus() )
                .master( game.getMaster() )
                .playerDtoList( game.getPlayerList()
                                    .stream()
                                    .map( player -> player.convertToDto() )
                                    .collect( Collectors.toList() ) )
                .build();
 }

 public Game addPlayerToGame ( Game game, Player playerToAdd ) {
  boolean playerExists = game.getPlayerList()
                             .stream()
                             .anyMatch( player -> player.getId().equals( playerToAdd.getId() ) );
  if ( playerExists ) {
   return game.toBuilder().build();
  }

  List<Player> updatedPlayerList = new ArrayList<>( game.getPlayerList() );
  updatedPlayerList.add( playerToAdd );
  return game.toBuilder()
             .playerList( updatedPlayerList )
             .build();
 }
}
