package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.QuestionStatus;
import com.dennisjauernig.flashcards.model.Solution;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDto {

 private String id;
 private QuestionStatus status;
 private Difficulty difficulty;
 private String category;
 private String question;
 private List<String> answers;
 private Solution solution;
 private Integer points;
}
