package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.enums.QuestionStatus;
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
public class QuestionDto {

 private UUID id;
 private QuestionStatus status;
 private Topic topic;
 private String category;
 private String question;
 private List<String> answers;
 private int points;
}
