package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

 private final QuestionsService questionsService;
 private final SessionService sessionService;

 public PlayerService ( QuestionsService questionsService, SessionService sessionService ) {
  this.questionsService = questionsService;
  this.sessionService = sessionService;
 }

 // √ Register new player
 public void registerPlayer ( String sessionId, PlayerDto playerDto ) {
  sessionService.registerNewPLayer( sessionId, playerDto.getId() );
 }

 // √ Regenerate an existing player
 public Player generateNewPlayer ( PlayerDto playerDto, List<QuestionDto> questionDtoList ) {
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
                  .score( questionsService.getScoreFromQuestionList( player.getQuestionDtoList() ) )
                  .build();
 }
}
