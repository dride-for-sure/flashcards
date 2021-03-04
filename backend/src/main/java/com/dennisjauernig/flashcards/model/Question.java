package com.dennisjauernig.flashcards.model;

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
}
