package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.Difficulty;
import com.dennisjauernig.flashcards.model.GameMaster;
import com.dennisjauernig.flashcards.model.GameStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameDto {

 private String id;
 private Difficulty difficulty;
 private GameStatus status;
 private GameMaster master;
 private List<PlayerDto> playerDtoList;
 private List<QuestionDto> questionDtoList;
}
