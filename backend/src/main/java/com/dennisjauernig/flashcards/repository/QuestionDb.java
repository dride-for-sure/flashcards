package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Question;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface QuestionDb extends PagingAndSortingRepository<QuestionDb, String> {

 public List<Question> findAll ();

 public List<Question> findAllById ( String id );
}
