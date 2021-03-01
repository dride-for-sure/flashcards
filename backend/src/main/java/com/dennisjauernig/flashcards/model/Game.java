package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

 private String id;
 private Difficulty difficulty;
 private GameStatus status;
 private GameMaster master;
 private List<Player> playerList;
 private List<Question> questionList;
}
