package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
@Document ( collection = "questions" )
public class Question {

 @Id
 private String id;
 private Difficulty difficulty;
 private String category;
 private String question;
 private List<String> answers;
 private Solution solution;

 public QuestionDto convertToInitDto () {
  return QuestionDto.builder()
                    .id( this.getId() )
                    .status( QuestionStatus.NONE )
                    .difficulty( this.getDifficulty() )
                    .category( this.getCategory() )
                    .question( this.getQuestion() )
                    .answers( this.getAnswers() )
                    .build();
 }
}
