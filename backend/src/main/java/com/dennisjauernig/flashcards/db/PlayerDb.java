package com.dennisjauernig.flashcards.db;

import com.dennisjauernig.flashcards.model.Player;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerDb extends PagingAndSortingRepository<Player, String> {
}
