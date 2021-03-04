package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Question;
import com.dennisjauernig.flashcards.model.QuestionStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionsService {

 public QuestionDto getInitialQuestionDto ( Question question ) {
  return QuestionDto.builder()
                    .id( question.getId() )
                    .status( QuestionStatus.NONE )
                    .difficulty( question.getDifficulty() )
                    .category( question.getCategory() )
                    .question( question.getQuestion() )
                    .answers( question.getAnswers() )
                    .build();
 }

 public List<QuestionDto> selectNextQuestion ( List<QuestionDto> questionDtoList ) {
  List<QuestionDto> questionListStatusNONE =
          questionDtoList.stream()
                         .filter( questionDto -> questionDto.getStatus()
                                                            .equals( QuestionStatus.NONE ) )
                         .collect( Collectors.toList() );
  List<QuestionDto> questionListStatusSELECTED =
          questionDtoList.stream()
                         .filter( questionDto -> questionDto.getStatus()
                                                            .equals( QuestionStatus.SELECTED ) )
                         .collect( Collectors.toList() );

  if ( questionListStatusNONE.size() > 0
          && questionListStatusSELECTED.size() == 0 ) {
   QuestionDto nextQuestion =
           questionListStatusNONE.get( ( int ) ( Math.random() * questionListStatusNONE.size() ) )
                                 .toBuilder()
                                 .status( QuestionStatus.SELECTED )
                                 .build();
   return questionDtoList.stream()
                         .map( questionDto ->
                                 questionDto.getId().equals( nextQuestion.getId() )
                                         ? nextQuestion
                                         : questionDto )
                         .collect( Collectors.toList() );
  }
  return questionDtoList;
 }
}
