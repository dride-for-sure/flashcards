package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder ( toBuilder = true )
public class Game {

 private UUID gameUuid;
 private GameStatus gameStatus;
 private List<Player> playerList;
 private List<CardWithoutSolution> cardList;
 private int maxPoints;

}
