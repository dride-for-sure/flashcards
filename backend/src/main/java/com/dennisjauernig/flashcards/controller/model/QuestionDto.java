package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.QuestionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
public class QuestionDto {

 private String id;
 private QuestionStatus status;
 private Difficulty difficulty;
 private String category;
 private String question;
 private List<String> answers;
 private int points;
}
