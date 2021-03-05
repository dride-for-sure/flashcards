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

 // √ Generate a new player with his own questionList
 public Player generateNewPlayer ( PlayerDto playerDto, List<Question> questionsList ) {
  List<QuestionDto> questionDtoList =
          questionsList.stream()
                       .map( question -> questionsService.convertQuestionToDto( question ) )
                       .collect( Collectors.toList() );
  return Player.builder()
               .id( playerDto.getId() )
               .name( playerDto.getName() )
               .questionDtoList( questionDtoList )
               .build();
 }

 // √ Convert a given player to its dto
 public PlayerDto convertPlayerToDto ( Player player ) {
  return PlayerDto.builder()
                  .id( player.getId() )
                  .name( player.getName() )
                  .score( getScoreFromQuestionList( player.getQuestionDtoList() ) )
                  .build();
 }

 // √ Sum the points in a given questionDtoList
 private int getScoreFromQuestionList ( List<QuestionDto> questionDtoList ) {
  return questionDtoList.stream()
                        .map( questionDto -> questionDto.getPoints() )
                        .reduce( 0, Integer::sum );
 }
}
