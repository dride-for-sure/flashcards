package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.ReceivedAnswerDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.repository.CardsDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AnswerService {

 private final GamesDb gamesDb;
 private final CardsDb cardsDb;
 private final MessagingService messagingService;
 private final ArchiveService archiveService;

 @Autowired
 public AnswerService (
         GamesDb gamesDb,
         CardsDb cardsDb,
         MessagingService messagingService,
         ArchiveService archiveService ) {
  this.gamesDb = gamesDb;
  this.cardsDb = cardsDb;
  this.messagingService = messagingService;
  this.archiveService = archiveService;
 }

 public Optional<Answer> receivedAnswer ( UUID gameId, UUID playerId, ReceivedAnswerDto dto ) {
  Optional<Game> game = this.gamesDb.getGame( gameId );
  if ( game.isPresent() ) {
   int pointsToAdd = calcAnswerPoints( dto );
   List<Player> updatedPlayerList = updatePlayerStats( playerId, game.get(), pointsToAdd );
   Game updatedGame = game.get().toBuilder()
                          .playerList( updatedPlayerList )
                          .build();
   if ( hasGameFinished( updatedPlayerList, game.get().getMaxPoints() ) ) {
    updatedGame.setGameStatus( GameStatus.FINISH );
    this.archiveService.addToArchive( updatedGame );
    this.gamesDb.deleteGame( updatedGame.getGameUuid() );
   } else {
    this.gamesDb.updateGame( updatedGame );
   }
   messagingService.sendGameUpdates( updatedGame );
   return Optional.of( Answer.builder()
                             .uuid( dto.getUuid() )
                             .answerChosen( dto.getAnswerChosen() )
                             .points( pointsToAdd )
                             .build() );
  }
  return Optional.empty();
 }

 private boolean hasGameFinished ( List<Player> updatedPlayerList, int maxPoints ) {
  return updatedPlayerList.stream()
                          .allMatch( player -> player.getCardsSolved() == maxPoints );
 }

 private List<Player> updatePlayerStats ( UUID playerId, Game game, int pointsToAdd ) {
  return game.getPlayerList().stream()
             .map( player -> player.getUuid().equals( playerId )
                     ? player.toBuilder()
                             .points( player.getPoints() + pointsToAdd )
                             .cardsSolved( player.getCardsSolved() + 1 )
                             .build()
                     : player.toBuilder()
                             .cardsSolved( player.getCardsSolved() + 1 )
                             .build() )
             .collect( Collectors.toList() );
 }

 private int calcAnswerPoints ( ReceivedAnswerDto dto ) {
  Card cardFromDb =
          cardsDb.findAllById( dto.getUuid() )
                 .stream()
                 .findFirst()
                 .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST, "Card is not available" ) );
  return cardFromDb.getSolution().equals( dto.getAnswerChosen() ) ? cardFromDb.getLevel() : 0;

 }
}