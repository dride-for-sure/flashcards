package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.config.GameConfig;
import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
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
 private final GameConfig gameConfig;

 @Autowired
 public GamesService (
         QuestionsService questionsService, PlayerService playerService,
         GamesDb gamesDb, GameConfig gameConfig ) {
  this.questionsService = questionsService;
  this.playerService = playerService;
  this.gamesDb = gamesDb;
  this.gameConfig = gameConfig;
 }

 // √ List all games with status PREPARE
 public List<GameDto> listAvailableGames () {
  return gamesDb.findAllByStatusIs( GameStatus.PREPARE ).stream()
                .map( game -> convertGameToDto( game ) )
                .collect( Collectors.toList() );
 }

 // √ Generate a new game with a specific gameMaster
 public Game generateNewGame (
         PlayerDto playerDto,
         Difficulty difficulty ) {
  List<Question> questionsList = questionsService.generateQuestionList( difficulty );
  Player player = playerService.generateNewPlayer( playerDto, questionsList );
  return Game.builder()
             .id( UUID.randomUUID() )
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

 // √ Get the QuestionList as Dto from existing game
 public List<QuestionDto> getQuestionListDto ( Game game, UUID playerId ) {
  List<QuestionDto> questionDtoList =
          game.getPlayerList()
              .stream()
              .filter( targetPlayer -> targetPlayer.getId().equals( playerId ) )
              .findFirst()
              .orElseThrow( () -> new IllegalArgumentException( "PlayerId: " + playerId +
                      " does not exists" ) )
              .getQuestionDtoList();
  return questionsService.selectNextQuestionFromList( questionDtoList );
 }

 // √ Convert the game to a game dto
 public GameDto convertGameToDto ( Game game ) {
  return GameDto.builder()
                .id( game.getId() )
                .difficulty( game.getDifficulty() )
                .status( game.getStatus() )
                .master( game.getMaster() )
                .playerDtoList( game.getPlayerList()
                                    .stream()
                                    .map( player -> playerService.convertPlayerToDto( player ) )
                                    .collect( Collectors.toList() ) )
                .build();
 }

 // √ Add a player to an existing game
 public Game addPlayerToGame ( Game game, Player player ) {
  boolean playerExists = isPlayerWithinExistingGame( player.getId(), game );
  if ( playerExists ) {
   return game.toBuilder().build();
  }

  List<Player> updatedPlayerList = new ArrayList<>( game.getPlayerList() );
  updatedPlayerList.add( player );
  return game.toBuilder()
             .playerList( updatedPlayerList )
             .build();
 }

 // √ Set game status to FINISH
 public Game setGameStatusToFinish ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.FINISH )
             .build();
 }

 // √ Set game status to PLAY
 public Game setGameStatusToPlay ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.PLAY )
             .build();
 }

 // √ Find player within an existing game
 public boolean isPlayerWithinExistingGame ( UUID playerId, Game game ) {
  return game.getPlayerList().stream()
             .anyMatch( player -> player.getId().equals( playerId ) );
 }

 // √ Check if another open game is allowed
 public boolean isMaxOpenGames () {
  return gamesDb.findAll().size() > gameConfig.getMaxOpenGames();
 }

 // √ Check if a specific player is gameMaster for a given game
 public boolean isGameMaster ( Game game, UUID playerId ) {
  return game.getMaster().getId().equals( playerId );
 }
}
