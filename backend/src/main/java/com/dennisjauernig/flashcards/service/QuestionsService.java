package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.config.GameConfig;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Question;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.model.enums.QuestionStatus;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionsService {

 public final QuestionDb questionDb;
 private final GameConfig gameConfig;

 public QuestionsService ( GameConfig gameConfig, QuestionDb questionDb ) {
  this.gameConfig = gameConfig;
  this.questionDb = questionDb;
 }

 // √
 public QuestionDto convertQuestionToDto ( Question question ) {
  return QuestionDto.builder()
                    .id( question.getId() )
                    .status( QuestionStatus.NONE )
                    .difficulty( question.getDifficulty() )
                    .category( question.getCategory() )
                    .question( question.getQuestion() )
                    .answers( question.getAnswers() )
                    .build();
 }

 public List<QuestionDto> selectNextQuestionFromList ( List<QuestionDto> questionDtoList ) {
  List<QuestionDto> questionListStatusNONE = questionDtoList
          .stream()
          .filter( questionDto -> questionDto.getStatus().equals( QuestionStatus.NONE ) )
          .collect( Collectors.toList() );
  List<QuestionDto> questionListStatusSELECTED = questionDtoList
          .stream()
          .filter( questionDto -> questionDto.getStatus().equals( QuestionStatus.SELECTED ) )
          .collect( Collectors.toList() );

  if ( questionListStatusNONE.size() > 0
          && questionListStatusSELECTED.size() == 0 ) {
   QuestionDto nextQuestion = questionListStatusNONE
           .get( ( int ) ( Math.random() * questionListStatusNONE.size() ) )
           .toBuilder()
           .status( QuestionStatus.SELECTED )
           .build();
   return questionDtoList.stream()
                         .map( questionDto -> questionDto.getId().equals( nextQuestion.getId() )
                                 ? nextQuestion
                                 : questionDto )
                         .collect( Collectors.toList() );
  }
  return questionDtoList;
 }

 // √
 public List<Question> generateQuestionList ( Difficulty difficulty ) {
  return selectRandomQuestionsFromList( filterQuestionsByDifficulty( difficulty ) );
 }

 // √
 private List<Question> selectRandomQuestionsFromList ( List<Question> questionsList ) {
  List<Question> chosenQuestions = new ArrayList<>();
  do {
   Question possibleQuestion = questionsList.get( ( int ) ( Math.random() * questionsList.size() ) );
   if ( !chosenQuestions.contains( possibleQuestion ) ) {
    chosenQuestions.add( possibleQuestion );
   }
  } while ( chosenQuestions.size() < questionsList.size()
          && chosenQuestions.size() < gameConfig.getMaxQuestions() );
  return chosenQuestions;
 }

 // √
 private List<Question> filterQuestionsByDifficulty ( Difficulty difficulty ) {
  return questionDb.findAll().stream().filter( question -> {
   if ( difficulty.equals( Difficulty.EASY ) ) {
    return question.getDifficulty().equals( Difficulty.EASY );
   } else if ( difficulty.equals( Difficulty.MODERATE ) ) {
    return question.getDifficulty().equals( Difficulty.EASY )
            || question.getDifficulty().equals( Difficulty.MODERATE );
   }
   return true;
  } ).collect( Collectors.toList() );
 }
}
