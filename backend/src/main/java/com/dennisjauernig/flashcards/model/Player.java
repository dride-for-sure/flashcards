package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
public class Player {

 private String id;
 private String name;
 private List<QuestionDto> questionList;

 public PlayerDto convertToDto () {
  return PlayerDto.builder()
                  .id( this.getId() )
                  .name( this.getName() )
                  .score( this.getScore() )
                  .build();
 }

 private int getScore () {
  return this.questionList.stream()
                          .map( questionDto -> questionDto.getPoints() )
                          .reduce( 0, Integer::sum );
 }
}
