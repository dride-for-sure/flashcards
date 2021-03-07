package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.GameDtoList;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDtoList;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.service.HandleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping ( "/api" )
public class GameController {

 private final HandleService handleService;

 public GameController ( HandleService handleService ) {
  this.handleService = handleService;
 }

 // √ Get initial lobby
 @GetMapping ( "/lobby" )
 public GameDtoList listAvailableGames () {
  return handleService.listAvailableGames();
 }

 // √ Open a new game
 @PostMapping ( "/game/{difficulty}" )
 public GameDto newGame (
         @PathVariable String difficulty,
         @RequestBody PlayerDto playerDto ) {
  return handleService.newGame( playerDto, Difficulty.valueOf( difficulty.toUpperCase() ) )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "It is not possible to open a new game" ) );
 }

 // √ Start the game, if gameMaster
 @PutMapping ( "/game/{gameId}/start" )
 public GameDto startGame (
         @PathVariable UUID gameId,
         @RequestBody PlayerDto playerDto ) {
  return handleService.startGame( gameId, playerDto )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "It is not possible to start this game: " + gameId ) );
 }

 // √ Join existing game
 @PutMapping ( "/game/{gameId}" )
 public GameDto joinExistingGame (
         @PathVariable UUID gameId,
         @RequestBody PlayerDto playerDto ) {
  return handleService.joinGame( playerDto, gameId )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "Could not join the game: " + gameId ) );
 }

 // √ Get inital questionDtoList
 @GetMapping ( "/game/{gameId}/{playerId}" )
 public QuestionDtoList listInitialQuestionDtos (
         @PathVariable UUID gameId,
         @PathVariable UUID playerId ) {
  return handleService.listGameQuestionDto( gameId, playerId )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "Player or game does not exists" ) );
 }
}
