package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.Question;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

 private final QuestionsService questionsService;

 public PlayerService ( QuestionsService questionsService ) {
  this.questionsService = questionsService;
 }

 public Player generateNewPlayer (
         PlayerDto playerDto,
         List<Question> questionsList ) {
  List<QuestionDto> questionDtoList =
          questionsList.stream()
                       .map( question -> questionsService.getInitialQuestionDto( question ) )
                       .collect( Collectors.toList() );
  return Player.builder()
               .id( playerDto.getId() )
               .name( playerDto.getName() )
               .questionDtoList( questionDtoList )
               .build();
 }

}
