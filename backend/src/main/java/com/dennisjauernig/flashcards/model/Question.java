package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Question {

 private String id;
 private QuestionStatus status;
 private Difficulty difficulty;
 private String category;
 private String question;
 private List<String> answers;
 private String icon;
 private Integer points;
}
