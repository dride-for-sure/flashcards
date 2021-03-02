package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
  return this.toBuilder()
             .playerList( this.getPlayerList()
                              .stream()
                              .map( player -> {
                               if ( player.getId()
                                          .equals( playerToAdd.getId() ) ) {
                                return playerToAdd;
                               }
                               return player;
                              } )
                              .collect( Collectors.toList() ) )
             .build();
 }
}

