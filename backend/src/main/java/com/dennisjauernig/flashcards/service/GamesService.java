package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GamesService {

 private final QuestionsService questionsService;

 @Autowired
 public GamesService ( QuestionsService questionsService ) {
  this.questionsService = questionsService;
 }

 public GameDto getPlayerDto ( Game game, String playerId ) {
  List<QuestionDto> questionDtoList =
          game.getPlayerList()
              .stream()
              .filter( targetPlayer -> targetPlayer.getId().equals( playerId ) )
              .findFirst()
              .orElseThrow( () -> new IllegalArgumentException( "PlayerId: " + playerId + " does not exists" ) )
              .getQuestionDtoList();
  return GameDto.builder()
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

 public Game start ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.PLAY )
             .build();
 }

 public Game finish ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.FINISH )
             .build();
 }

}
