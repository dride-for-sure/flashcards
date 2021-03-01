package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.StartGameDto;
import com.dennisjauernig.flashcards.db.GamesDb;
import com.dennisjauernig.flashcards.db.LobbyDb;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.GameStatus;
import com.dennisjauernig.flashcards.model.Player;
import com.dennisjauernig.flashcards.model.Question;
import com.dennisjauernig.flashcards.repository.CardsDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InitGameService {

 public final CardsDb cardsDb;
 private final GamesDb gamesDb;
 private final LobbyDb lobbyDb;

 @Autowired
 public InitGameService ( LobbyDb lobbyDb, GamesDb gamesDb, CardsDb cardsDb ) {
  this.lobbyDb = lobbyDb;
  this.gamesDb = gamesDb;
  this.cardsDb = cardsDb;
 }

 public Optional<Game> startGame ( StartGameDto dto ) {
  if ( !gamesDb.hasGame( dto.getUuid() ) && dto.getUuid().equals( this.lobbyDb.getLobbyUuid() ) ) {
   Game game = gameFactory( dto );
   this.lobbyDb.resetLobby();
   return Optional.of( this.gamesDb.addGame( game ) );
  }
  return Optional.empty();
 }

 private Game gameFactory ( StartGameDto dto ) {
  UUID gameUuid = dto.getUuid();
  GameStatus gameStatus = GameStatus.PLAY;
  List<Player> playerList = createGamePlayerListFromLobby();
  List<Question> cardList = generateRandomCardList( dto.getLevel() );
  int maxPoints = getMaxPointsFromCardList( cardList );
  return new Game( gameUuid, gameStatus, playerList, cardList, maxPoints );
 }

 private List<Player> createGamePlayerListFromLobby () {
  return this.lobbyDb.getGamePlayer().stream()
                     .map( player -> player.toBuilder()
                                           .uuid( player.getUuid() )
                                           .name( player.getName() )
                                           .points( 0 )
                                           .cardsSolved( 0 )
                                           .build() )
                     .collect( Collectors.toList() );
 }

 private List<Question> generateRandomCardList ( int level ) {
  List<Card> filteredByLevel = filterCardsByLevel( this.cardsDb.findAll(), level );
  List<Card> cards = new ArrayList<>();
  while ( cards.size() < 25 ) {
   cards.add( filteredByLevel.get( ( int ) ( Math.random() * filteredByLevel.size() ) ) );
  }
  return removeSolutionsFromCardList( cards );
 }

 private int getMaxPointsFromCardList ( List<Question> cardList ) {
  return cardList.stream()
                 .map( Question::getLevel )
                 .reduce( 0, Integer::sum );
 }

 private List<Card> filterCardsByLevel ( List<Card> cardList, int level ) {
  return cardList.stream()
                 .filter( card -> card.getLevel() <= level )
                 .collect( Collectors.toList() );
 }

 private List<Question> removeSolutionsFromCardList ( List<Card> cardList ) {
  return cardList.stream()
                 .map( card -> new Question(
                         card.getUuid(),
                         card.getLevel(),
                         card.getSubject(),
                         card.getQuestion(),
                         card.getChoices() ) )
                 .collect( Collectors.toList() );
 }
}

