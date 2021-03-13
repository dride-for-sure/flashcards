package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.enums.GameStatus;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GamesDb extends PagingAndSortingRepository<Game, UUID> {

 @Override
 List<Game> findAll ();

 @Override
 Optional<Game> findById ( UUID uuid );

 List<Game> findAllByStatusIs ( GameStatus gameStatus );

}