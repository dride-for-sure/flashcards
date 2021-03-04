package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder ( toBuilder = true )
@Document ( collection = "games" )
public class Game {

 @Id
 private String id;
 private Difficulty difficulty;
 private GameStatus status;
 private GameMaster master;
 private List<Player> playerList;
 private List<Question> questionList;
}

