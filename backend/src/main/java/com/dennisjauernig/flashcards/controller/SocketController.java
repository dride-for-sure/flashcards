package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.services.AnswersService;
import com.dennisjauernig.flashcards.services.LobbyService;
import com.dennisjauernig.flashcards.services.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Controller
public class SocketController {

 private final AnswersService answerService;
 private final LobbyService lobbyService;
 private final PlayService playService;
 private final SimpMessagingTemplate simpMessagingTemplate;

 @Autowired
 public SocketController (AnswersService answersService,
													LobbyService lobbyService,
													PlayService playService,
													SimpMessagingTemplate simpMessagingTemplate) {
	this.answerService = answersService;
	this.lobbyService = lobbyService;
	this.playService = playService;
	this.simpMessagingTemplate = simpMessagingTemplate;
 }

 @MessageMapping ("/lobby")
 @SendTo ("/topic/lobby")
 public Lobby joinGame (AddPlayerDto dto) {
	return lobbyService.joinGame( dto )
								 .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
												 "User: " + dto.getUuid() + " could not join" ) );
 }

 @MessageMapping ("/games")
 public void startGame (StartGameDto dto) {
	playService.startGame( dto );
 }

 @MessageMapping ("/games/{gameId}/{playerId}")
 @SendTo ("/topic/games/{gameId}")
 public Answer receivedAnswer (@DestinationVariable UUID gameId,
															 @DestinationVariable UUID playerId,
															 ReceivedAnswerDto dto) {
	return answerService.receivedAnswer( gameId, playerId, dto )
								 .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
												 "Answer: " + dto.getUuid() + " within the game: " + gameId + " could not be " +
																 "received" ) );
 }

 public void sendGameUpdates (Game game) {
	simpMessagingTemplate.convertAndSend( "/topic/games/" + game.getUuid(), game );
 }
}
