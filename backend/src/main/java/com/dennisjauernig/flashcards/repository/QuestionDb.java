package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.Question;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface QuestionDb extends PagingAndSortingRepository<Question, UUID> {

 @Override
 List<Question> findAll ();

}
