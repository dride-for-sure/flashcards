package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.controller.model.ReceivedAnswerDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayService {

 private final GamesDb gamesDb;
 private final QuestionDb questionDb;

 @Autowired
 public PlayService (
         GamesDb gamesDb,
         QuestionDb questionDb
 ) {
  this.gamesDb = gamesDb;
  this.questionDb = questionDb;
 }

 public Optional<GameDto> updateGame (
         ReceivedAnswerDto dto,
         String gameId,
         String playerId ) {
  Optional<Game> game = this.gamesDb.getGame( gameId );
  Optional<Integer> gatheredPoints = calcGatheredPoints( dto );

  if ( game.isEmpty() || gatheredPoints.isEmpty() || !this.playerDb.existsById( playerId ) ) {
   return Optional.empty();
  }

  Game updatedGame = updatePlayerWithinGame( dto, playerId, game.get(), gatheredPoints.get() );
  this.gamesDb.updateGame( updatedGame );
  return buildUpdateGameDto( updatedGame, playerId );
 }

 private Optional<GameDto> buildUpdateGameDto ( Game updatedGame, String playerId ) {
  Optional<Player> playerToUpdate = updatedGame.getPlayerList()
                                               .stream()
                                               .filter( player ->
                                                       player.getId().equals( playerId ) )
                                               .findAny();
  if ( playerToUpdate.isPresent() ) {
   return Optional.of( GameDto.builder()
                              .id( updatedGame.getId() )
                              .difficulty( updatedGame.getDifficulty() )
                              .status( updatedGame.getStatus() )
                              .master( updatedGame.getMaster() )
                              .playerDtoList( updatedGame.getPlayerList()
                                                         .stream()
                                                         .map( this::convertPlayerToPlayerDto )
                                                         .collect( Collectors.toList() ) )
                              .questionDtoList( playerToUpdate.get().getQuestionList() )
                              .build() );
  }
  return Optional.empty();
 }

 private PlayerDto convertPlayerToPlayerDto ( Player player ) {
  return PlayerDto.builder()
                  .id( player.getId() )
                  .name( player.getName() )
                  .score( player.getQuestionList().stream()
                                .map( QuestionDto::getPoints )
                                .reduce( 0, Integer::sum ) )
                  .build();
 }

 private Game updatePlayerWithinGame (
         ReceivedAnswerDto dto,
         String playerId,
         Game game,
         int gatheredPoints ) {
  return game.toBuilder()
             .playerList(
                     game.getPlayerList()
                         .stream()
                         .peek( player -> {
                          if ( player.getId().equals( playerId ) ) {
                           player.toBuilder()
                                 .questionList(
                                         player.getQuestionList()
                                               .stream()
                                               .peek( question -> {
                                                if ( question.getId().equals( dto.getId() ) ) {
                                                 question.toBuilder()
                                                         .status( QuestionStatus.SOLVED )
                                                         .points( gatheredPoints )
                                                         .build();
                                                }
                                               } ).collect( Collectors.toList() ) )
                                 .build();
                          }
                         } )
                         .collect( Collectors.toList() ) )
             .build();
 }

 private Optional<Integer> calcGatheredPoints ( ReceivedAnswerDto dto ) {
  Optional<Question> question = questionDb.findAllById( dto.getId() )
                                          .stream()
                                          .findFirst();
  if ( question.isPresent() ) {
   int points = 1;
   if ( question.get().getDifficulty().equals( Difficulty.HARD ) ) {
    points = 3;
   } else if ( question.get().getDifficulty().equals( Difficulty.MODERATE ) ) {
    points = 2;
   }
   return Optional.of( points );
  }
  return Optional.empty();
 }

}