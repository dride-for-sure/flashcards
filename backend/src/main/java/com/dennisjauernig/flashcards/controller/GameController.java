package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.model.AddPlayerDto;
import com.dennisjauernig.flashcards.model.Answer;
import com.dennisjauernig.flashcards.model.ReceivedAnswerDto;
import com.dennisjauernig.flashcards.model.StartGameDto;
import com.dennisjauernig.flashcards.services.AnswersService;
import com.dennisjauernig.flashcards.services.LobbyService;
import com.dennisjauernig.flashcards.services.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping ("api")
public class GameController {

 private final AnswersService answerService;
 private final LobbyService lobbyService;
 private final PlayService playService;

 @Autowired
 public GameController (AnswersService answersService, LobbyService lobbyService,
												PlayService playService) {
	this.answerService = answersService;
	this.lobbyService = lobbyService;
	this.playService = playService;
 }

 @PostMapping ("lobby")
 public UUID joinGame (@RequestBody AddPlayerDto dto) {
	return lobbyService.joinGame( dto )
					.orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
									"User: " + dto.getUuid() + " could not join" ) );
 }

 @PutMapping ("games/{gameId}/{playerId}")
 public List<Answer> receivedAnswer (@PathVariable String gameId, @PathVariable String playerId,
																		 @RequestBody ReceivedAnswerDto dto) {
	return answerService.receivedAnswer( gameId, playerId, dto )
					.orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
									"Answer: " + dto.getUuid() + " within the game: " + gameId + " could not be " +
													"received" ) );
 }

 @PostMapping ("games/{gameId}/{playerId}")
 public void startGame (@PathVariable String gameId, @PathVariable String playerId,
												@RequestBody StartGameDto dto) {
	playService.startGame( gameId, playerId, dto );
 }
}
