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
@Builder
public class Game {

 private UUID uuid;
 private GameStatus status;
 private List<Player> players;
 private List<Card> cards;
 private int maxPoints;

}
