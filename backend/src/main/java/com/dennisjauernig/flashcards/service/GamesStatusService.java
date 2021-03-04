package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import org.springframework.stereotype.Service;

@Service
public class GamesStatusService {

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
