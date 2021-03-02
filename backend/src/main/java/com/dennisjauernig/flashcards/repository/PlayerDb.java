package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerDb extends PagingAndSortingRepository<PlayerDto, String> {
 public Optional<PlayerDto> findById ( String id );
}
