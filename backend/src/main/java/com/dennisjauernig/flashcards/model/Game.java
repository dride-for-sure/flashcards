package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder ( toBuilder = true )
public class Game {

 private String id;
 private Difficulty difficulty;
 private GameStatus status;
 private GameMaster master;
 private List<Player> playerList;
 private List<Question> questionList;

 public GameDto convertToPlayerDto ( String playerId ) {
  List<QuestionDto> questionDtoList =
          this.getPlayerList()
              .stream()
              .filter( targetPlayer -> targetPlayer.getId().equals( playerId ) )
              .findFirst()
              .orElseThrow( () -> new IllegalArgumentException( "PlayerId: " + playerId + " does not exists" ) )
              .getQuestionDtoList();
  return GameDto.builder()
                .id( this.getId() )
                .difficulty( this.getDifficulty() )
                .status( this.getStatus() )
                .master( this.getMaster() )
                .playerDtoList( this.getPlayerList()
                                    .stream()
                                    .map( player -> player.convertToDto() )
                                    .collect( Collectors.toList() ) )
                .questionDtoList( questionDtoList )
                .build();
 }

 public GameDto convertToDto () {
  return GameDto.builder()
                .id( this.getId() )
                .difficulty( this.getDifficulty() )
                .status( this.getStatus() )
                .master( this.getMaster() )
                .playerDtoList( this.getPlayerList()
                                    .stream()
                                    .map( player -> player.convertToDto() )
                                    .collect( Collectors.toList() ) )
                .build();
 }

 public Game addPlayer ( Player playerToAdd ) {
  if ( this.getPlayerList()
           .stream()
           .anyMatch( player -> player.getId().equals( playerToAdd.getId() ) ) ) {
   return this.toBuilder().build();
  }
  List<Player> updatedPlayerList = new ArrayList<>( this.getPlayerList() );
  updatedPlayerList.add( playerToAdd );
  return this.toBuilder()
             .playerList( updatedPlayerList )
             .build();
 }

 public Game start () {
  return this.toBuilder()
             .status( GameStatus.PLAY )
             .build();
 }

 public Game finish () {
  return this.toBuilder()
             .status( GameStatus.FINISH )
             .build();
 }
}

