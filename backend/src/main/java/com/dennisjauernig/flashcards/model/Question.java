package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.model.enums.Solution;
import com.dennisjauernig.flashcards.model.enums.Topic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
public class Question {

 private UUID id;
 private Topic topic;
 private String category;
 private String question;
 private List<String> answers;
 private Solution solution;
 private Boolean firstQuestion;
}
