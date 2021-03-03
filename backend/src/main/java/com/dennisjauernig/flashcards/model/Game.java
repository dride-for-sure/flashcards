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
                .questionDtoList( selectNextQuestion( questionDtoList ) )
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

 private List<QuestionDto> selectNextQuestion ( List<QuestionDto> questionDtoList ) {
  List<QuestionDto> questionListStatusNONE =
          questionDtoList.stream()
                         .filter( questionDto -> questionDto.getStatus()
                                                            .equals( QuestionStatus.NONE ) )
                         .collect( Collectors.toList() );
  List<QuestionDto> questionListStatusSELECTED =
          questionDtoList.stream()
                         .filter( questionDto -> questionDto.getStatus()
                                                            .equals( QuestionStatus.SELECTED ) )
                         .collect( Collectors.toList() );
  if ( questionListStatusNONE.size() > 0 && questionListStatusSELECTED.size() == 0 ) {
   QuestionDto nextQuestion =
           questionListStatusNONE.get( ( int ) ( Math.random() * questionListStatusNONE.size() ) )
                                 .toBuilder()
                                 .status( QuestionStatus.SELECTED )
                                 .build();
   return questionDtoList.stream()
                         .map( questionDto ->
                                 questionDto.getId().equals( nextQuestion.getId() )
                                         ? nextQuestion
                                         : questionDto )
                         .collect( Collectors.toList() );
  }
  return questionDtoList;
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

