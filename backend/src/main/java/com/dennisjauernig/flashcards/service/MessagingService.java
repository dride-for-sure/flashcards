package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.controller.model.*;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MessagingService {

 private final SimpMessagingTemplate simpMessagingTemplate;
 private final GamesService gamesService;
 private final QuestionsService questionsService;

 @Autowired
 public MessagingService (
         SimpMessagingTemplate simpMessagingTemplate,
         GamesService gamesService,
         QuestionsService questionsService ) {
  this.simpMessagingTemplate = simpMessagingTemplate;
  this.gamesService = gamesService;
  this.questionsService = questionsService;
 }

 // √ Broadcast all open games to the lobby
 public void broadcastGameDtoList ( List<GameDto> gameDtoList ) {
  System.out.println( "Broadcast gameDto to lobby" );
  GameDtoList gamesToBroadcast = gamesService.addTypeToGameDtoList( gameDtoList );
  simpMessagingTemplate.convertAndSend( "/topic/games", gamesToBroadcast );
 }

 // √ Broadcast the gameDto to all player within this game
 public void broadcastGameDto ( Game game ) {
  System.out.println( "Broadcast gameDto to all player" );
  GameDto gameDto = gamesService.convertGameToDto( game );
  for ( PlayerDto playerDto : gameDto.getPlayerDtoList() ) {
   simpMessagingTemplate.convertAndSend( "/queue/player/" + playerDto.getId(), gameDto );
  }
 }

 // √ Broadcast questionDtoList to one player
 public void broadcastQuestionDtoListToPlayer ( List<QuestionDto> questionDtoList, UUID playerId ) {
  System.out.println( "Broadcast gameDto to player" );
  QuestionDtoList questionsToBroadcast = questionsService.addTypeToQuestionDtoList( questionDtoList );
  simpMessagingTemplate.convertAndSend( "/queue/player/" + playerId, questionsToBroadcast );
 }


 // √ Broadcast questionDtoList to all player within the game
 public void broadcastQuestionDtoList ( Game game ) {
  for ( Player player : game.getPlayerList() ) {
   List<QuestionDto> questionDtoList = questionsService.getQuestionListDto( game, player.getId() );
   QuestionDtoList questionsToBroadcast = questionsService.addTypeToQuestionDtoList( questionDtoList );
   simpMessagingTemplate.convertAndSend( "/topic/user/" + game.getId() + "/" + player.getId(),
           questionsToBroadcast );
  }
 }
}