package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.Question;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

 private final QuestionsService questionsService;

 public PlayerService ( QuestionsService questionsService ) {
  this.questionsService = questionsService;
 }

 public Player generateNewPlayer (
         Principal principal,
         String playerName,
         List<Question> questionsList ) {
  List<QuestionDto> questionDtoList =
          questionsList.stream()
                       .map( question -> questionsService.getInitialQuestionDto( question ) )
                       .collect( Collectors.toList() );
  return Player.builder()
               .id( principal )
               .name( playerName )
               .questionDtoList( questionDtoList )
               .build();
 }

 public PlayerDto convertToDto ( Player player ) {
  return PlayerDto.builder()
                  .name( player.getName() )
                  .score( getScoreFromQuestionList( player.getQuestionDtoList() ) )
                  .build();
 }

 private int getScoreFromQuestionList ( List<QuestionDto> questionDtoList ) {
  return questionDtoList.stream()
                        .map( questionDto -> questionDto.getPoints() )
                        .reduce( 0, Integer::sum );
 }

}
