package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Question;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface QuestionDb extends PagingAndSortingRepository<Question, String> {

 @Override
 public List<Question> findAll ();

 public List<Question> findAllById ( String id );
}
