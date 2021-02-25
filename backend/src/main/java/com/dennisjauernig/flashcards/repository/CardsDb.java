package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Card;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface CardsDb extends PagingAndSortingRepository<Card, UUID> {

 public List<Card> findAll ();

 public List<Card> findAllById (UUID uuid);
}
