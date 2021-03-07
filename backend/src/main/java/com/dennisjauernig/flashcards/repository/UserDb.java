package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.GameUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDb extends PagingAndSortingRepository<GameUser, String> {
}
