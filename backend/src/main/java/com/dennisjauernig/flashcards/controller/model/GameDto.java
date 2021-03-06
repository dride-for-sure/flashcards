package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.GameMaster;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameDto {

 private final DtoType dtoType = DtoType.GAME;
 private UUID id;
 private Difficulty difficulty;
 private GameStatus status;
 private GameMaster master;
 private int maxPoints;

 @JsonProperty ( "playerList" )
 private List<PlayerDto> playerDtoList;
}
