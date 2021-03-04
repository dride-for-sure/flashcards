package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface GamesDb extends PagingAndSortingRepository<Game, String> {

 @Override
 List<Game> findAll ();

 List<Game> findAllByStatusIs ( GameStatus gameStatus );

}