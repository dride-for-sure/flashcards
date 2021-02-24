package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lobby {

 private UUID uuid;
 private GameStatus status;
 private List<Player> players;

}
