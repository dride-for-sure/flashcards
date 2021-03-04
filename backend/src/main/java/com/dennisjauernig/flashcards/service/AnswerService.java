package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.enums.QuestionStatus;
import com.dennisjauernig.flashcards.model.enums.Solution;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnswerService {

 private final QuestionDb questionDb;
 private final GamesService gamesService;

 public AnswerService (
         QuestionDb questionDb,
         GamesService gamesService ) {
  this.questionDb = questionDb;
  this.gamesService = gamesService;
 }

 public Game updateGame ( Principal principal, Game game, AnswerDto answerDto ) {
  Game updatedGame = game.toBuilder()
                         .playerList(
                                 game.getPlayerList()
                                     .stream()
                                     .map( player -> player.getId().equals( principal )
                                             ? updatePlayerAnswers( player, answerDto )
                                             : player )
                                     .collect( Collectors.toList() ) )
                         .build();
  return hasPlayerFinished( updatedGame );
 }

 private Player updatePlayerAnswers ( Player player, AnswerDto answerDto ) {
  return player.toBuilder().questionDtoList(
          player.getQuestionDtoList()
                .stream()
                .map( questionDto -> questionDto.getId().equals( answerDto.getId() )
                        ? questionDto.toBuilder()
                                     .status( QuestionStatus.SOLVED )
                                     .points( calcQuestionPoints( questionDto, answerDto ) )
                                     .build()
                        : questionDto )
                .collect( Collectors.toList() ) )
               .build();
 }

 private int calcQuestionPoints ( QuestionDto questionDto, AnswerDto answerDto ) {
  Solution solution =
          questionDb.findById( answerDto.getId() )
                    .orElseThrow( () -> new IllegalArgumentException( "Question: " + answerDto
                            .getId() + " does not exist" ) ).getSolution();
  if ( answerDto.getSelectedSolution().equals( solution ) ) {
   return switch ( questionDto.getDifficulty() ) {
    case EASY -> 1;
    case MODERATE -> 2;
    case HARD -> 3;
   };
  }
  return 0;
 }


 private Game hasPlayerFinished ( Game game ) {
  Optional<Boolean> finished =
          game.getPlayerList()
              .stream()
              .map( player ->
                      player.getQuestionDtoList()
                            .stream()
                            .allMatch( questionDto ->
                                    questionDto.getStatus()
                                               .equals( QuestionStatus.SOLVED ) ) )
              .filter( aBoolean -> aBoolean )
              .findFirst();
  return finished.isPresent() ? gamesService.setGameStatusToFinish( game ) : game;
 }
}
