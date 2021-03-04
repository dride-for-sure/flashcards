package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface GamesDb extends PagingAndSortingRepository<Game, String> {

 @Override
 List<Game> findAll ();

 List<Game> findAllById ( String id );

 List<Game> findAllByStatusIs ( GameStatus gameStatus );
}