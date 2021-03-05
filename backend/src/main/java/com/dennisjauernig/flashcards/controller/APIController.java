package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.controller.model.GameDto;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.model.enums.Difficulty;
import com.dennisjauernig.flashcards.service.HandleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping ( "/api" )
public class APIController {

 private final HandleService handleService;

 public APIController ( HandleService handleService ) {
  this.handleService = handleService;
 }

 // √ Get initial lobby
 @GetMapping ( "/lobby" )
 public List<GameDto> listAvailableGames () {
  return handleService.listAvailableGames();
 }

 // √ Open a new game
 @PostMapping ( "/game/{difficulty}" )
 public GameDto newGame (
         @PathVariable String difficulty,
         @RequestBody PlayerDto playerDto ) {
  return handleService.newGame( playerDto, Difficulty.valueOf( difficulty.toUpperCase() ) )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "It is not possible to open a game" ) );
 }

 // √ Start the game, if gameMaster
 @PutMapping ( "/game/{gameId}" )
 public GameDto startGame (
         @PathVariable UUID gameId,
         @RequestBody PlayerDto playerDto ) {
  return handleService.startGame( gameId, playerDto )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "It is not possible to start this game: " + gameId ) );
 }

 // √ Get game after join existing game
 @PostMapping ( "/game/{gameId}" )
 public GameDto joinExistingGame (
         @PathVariable UUID gameId,
         @RequestBody PlayerDto playerDto ) {
  return handleService.joinGame( playerDto, gameId )
                      .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                              "Could not join the game: " + gameId ) );
 }
}
