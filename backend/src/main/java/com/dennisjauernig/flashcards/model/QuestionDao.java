package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.model.enums.Solution;
import com.dennisjauernig.flashcards.model.enums.Topic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
@Document ( collection = "questions" )
public class QuestionDao {

 @Id
 private UUID id;
 private Topic topic;
 private String category;
 private String question;
 private List<String> answers;
 private Solution solution;
}
