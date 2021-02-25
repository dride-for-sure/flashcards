package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.AddPlayerDto;
import com.dennisjauernig.flashcards.controller.model.ReceivedAnswerDto;
import com.dennisjauernig.flashcards.controller.model.StartGameDto;
import com.dennisjauernig.flashcards.model.Answer;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Lobby;
import com.dennisjauernig.flashcards.service.AnswerService;
import com.dennisjauernig.flashcards.service.InitGameService;
import com.dennisjauernig.flashcards.service.LobbyService;
import com.dennisjauernig.flashcards.service.MessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Controller
public class SocketController {

 private final AnswerService answerService;
 private final LobbyService lobbyService;
 private final InitGameService initGameService;
 private final MessagingService messagingService;

 @Autowired
 public SocketController (AnswerService answerService,
													LobbyService lobbyService,
													InitGameService initGameService,
													MessagingService messagingService) {
	this.answerService = answerService;
	this.lobbyService = lobbyService;
	this.initGameService = initGameService;
	this.messagingService = messagingService;
 }

 @MessageMapping ("/lobby")
 @SendTo ("/topic/lobby")
 public Lobby addPlayerToLobby (AddPlayerDto dto) {
	return lobbyService.addPlayerToLobby( dto )
								 .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
												 "User: " + dto.getUuid() + " could not join" ) );
 }

 @MessageMapping ("/games")
 public void initGame (StartGameDto dto) {
	Game game = initGameService.initGame( dto )
											.orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
															"Card is not available" ) );
	messagingService.sendGameUpdates( game );
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
}
