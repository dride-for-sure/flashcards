package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.GameMaster;
import com.dennisjauernig.flashcards.model.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpenGameDto {

 private String id;
 private Difficulty difficulty;
 private GameStatus status;
 private GameMaster master;
 private int playerCount;
}
