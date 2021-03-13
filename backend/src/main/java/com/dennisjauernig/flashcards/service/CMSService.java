package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.repository.GamesDb;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.stereotype.Service;

@Service
public class CMSService {

 private final GamesDb gamesDb;
 private final QuestionDb questionDb;

 public CMSService ( GamesDb gamesDb, QuestionDb questionDb ) {
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
 }

 /*public List<Question> listQuestions () {
  return questionDb.findAll();
 }
*/
 /*public List<Game> listGames () {
  return gamesDb.findAll();
 }

 public Optional<Game> deleteGame ( UUID gameId ) {
  Optional<Game> gameToDelete = gamesDb.findById( gameId );
  gamesDb.deleteById( gameId );
  return gameToDelete;
 }

 public Optional<Question> deleteQuestion ( UUID questionId ) {
  Optional<QuestionDao> questionToDelete = questionDb.findById( questionId );
  questionDb.deleteById( questionId );
  return questionToDelete;
 }

 public Optional<Question> updateQuestion ( Question question ) {
  if ( questionDb.existsById( question.getId() ) ) {
   return Optional.of( questionDb.save( question ) );
  }
  return Optional.empty();
 }

 public Optional<Question> addQuestion ( Question question ) {
  return Optional.of( questionDb.save( question.toBuilder()
                                               .id( UUID.randomUUID() )
                                               .build() ) );
 }*/
}
