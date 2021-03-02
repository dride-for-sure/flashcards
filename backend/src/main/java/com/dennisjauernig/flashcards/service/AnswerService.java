package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.AnswerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnswerService {

 private final GamesDb gamesDb;
 private final QuestionDb questionDb;
 private final MessagingService messagingService;

 public AnswerService (
         GamesDb gamesDb,
         QuestionDb questionDb,
         MessagingService messagingService ) {
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
  this.messagingService = messagingService;
 }

 public void updateGame ( String gameId, String playerId, AnswerDto answerDto ) {
  Optional<Game> gameToUpdate = gamesDb.getGame( gameId );
  if ( gameToUpdate.isPresent() ) {
   Game updatedGame =
           gameToUpdate.get()
                       .toBuilder()
                       .playerList(
                               gameToUpdate.get()
                                           .getPlayerList()
                                           .stream()
                                           .map( player -> player.getId().equals( playerId )
                                                   ? updatePlayerAnswers( player, answerDto )
                                                   : player )
                                           .collect( Collectors.toList() ) )
                       .build();
   messagingService.broadcastGameUpdatesToPlayer( gamesDb.updateGame( hasPlayerFinished( updatedGame ) ) );
  }
 }

 private Game hasPlayerFinished ( Game game ) {
  Optional<Boolean> finished = game.getPlayerList()
                                   .stream()
                                   .map( player ->
                                           player.getQuestionList()
                                                 .stream()
                                                 .allMatch( questionDto ->
                                                         questionDto.getStatus()
                                                                    .equals( QuestionStatus.SOLVED ) ) )
                                   .filter( aBoolean -> aBoolean )
                                   .findFirst();
  return finished.isPresent() ? game.finish() : game;
 }

 private Player updatePlayerAnswers ( Player player, AnswerDto answerDto ) {
  return player.toBuilder().questionList(
          player.getQuestionList()
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
  Solution solution = questionDb.findById( answerDto.getId() )
                                .orElseThrow( () -> new IllegalArgumentException( "Question: " + answerDto
                                        .getId() + " does not exist" ) ).getSolution();
  if ( answerDto.getSelectedSolution().equals( solution ) ) {
   if ( questionDto.getDifficulty().equals( Difficulty.EASY ) ) {
    return 1;
   } else if ( questionDto.getDifficulty().equals( Difficulty.MODERATE ) ) {
    return 2;
   } else {
    return 3;
   }
  } else {
   return 0;
  }
 }
}