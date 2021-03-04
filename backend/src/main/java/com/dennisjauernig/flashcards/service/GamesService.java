package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameMaster;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.Question;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import com.dennisjauernig.flashcards.repository.GamesDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
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
                .map( game -> getGameAsDto( game ) )
                .collect( Collectors.toList() );
 }

 public Game generateNewGame (
         Principal principal,
         String playerName,
         Difficulty difficulty ) {
  List<Question> questionsList = questionsService.generateQuestionList( difficulty );
  Player player = playerService.generateNewPlayer( principal, playerName, questionsList );
  return Game.builder()
             .id( UUID.randomUUID().toString() )
             .difficulty( difficulty )
             .status( GameStatus.PREPARE )
             .master( GameMaster.builder()
                                .id( principal )
                                .name( playerName )
                                .build() )
             .playerList( new ArrayList<>( Collections.singletonList( player ) ) )
             .questionList( questionsList )
             .build();
 }

 public List<QuestionDto> getQuestionListDto ( Game game, Principal principal ) {
  List<QuestionDto> questionDtoList =
          game.getPlayerList()
              .stream()
              .filter( targetPlayer -> targetPlayer.getId().equals( principal ) )
              .findFirst()
              .orElseThrow( () -> new IllegalArgumentException( "PlayerId: " + principal + " does not " +
                      "exists" ) )
              .getQuestionDtoList();
  return questionsService.selectNextQuestion( questionDtoList );
 }

 public GameDto getGameAsDto ( Game game ) {
  return GameDto.builder()
                .id( game.getId() )
                .difficulty( game.getDifficulty() )
                .status( game.getStatus() )
                .master( game.getMaster() )
                .playerDtoList( game.getPlayerList()
                                    .stream()
                                    .map( player -> playerService.convertToDto( player ) )
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

 public Game setGameStatusToFinish ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.FINISH )
             .build();
 }

 public boolean isPlayerWithinGame ( Principal principal, Game game ) {
  return game.getPlayerList().stream()
             .anyMatch( player -> player.getId().equals( principal ) );
 }
}
