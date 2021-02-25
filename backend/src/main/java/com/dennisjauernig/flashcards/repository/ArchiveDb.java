package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Player;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ArchiveDb extends PagingAndSortingRepository<Player, UUID> {

}
