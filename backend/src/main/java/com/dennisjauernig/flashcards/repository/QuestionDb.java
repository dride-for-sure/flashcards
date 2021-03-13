package com.dennisjauernig.flashcards.repository;

import com.dennisjauernig.flashcards.model.QuestionDao;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;

public interface QuestionDb extends PagingAndSortingRepository<QuestionDao, UUID> {

 @Override
 List<QuestionDao> findAll ();

}
