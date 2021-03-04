package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;

public class GameStatusService {

 public Game start ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.PLAY )
             .build();
 }

 public Game finish ( Game game ) {
  return game.toBuilder()
             .status( GameStatus.FINISH )
             .build();
 }
}
