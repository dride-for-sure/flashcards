package com.dennisjauernig.flashcards.controller;

import com.dennisjauernig.flashcards.service.CMSService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ( "/api" )
public class CMSController {

 private final CMSService cmsService;

 public CMSController ( CMSService cmsService ) {
  this.cmsService = cmsService;
 }

 /*@GetMapping ( "/questions" )
 public List<Question> listQuestions () {
  return cmsService.listQuestions();
 }

 @GetMapping ( "/games" )
 public List<Game> listGames () {
  return cmsService.listGames();
 }

 @DeleteMapping ( "/games/{gameId}" )
 public Game deleteGame ( @PathVariable UUID gameId ) {
  return cmsService.deleteGame( gameId )
                   .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                           "Game: " + gameId + " could not be deleted" ) );
 }

 @DeleteMapping ( "/questions/{questionId}" )
 public Question deleteQuestion ( @PathVariable UUID questionId ) {
  return cmsService.deleteQuestion( questionId )
                   .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                           "Question: " + questionId + " could not be deleted" ) );
 }

 @PutMapping ( "/questions" )
 public Question updateQuestion ( @RequestBody Question question ) {
  return cmsService.updateQuestion( question )
                   .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                           "Question: " + question.getId() + " could not be updated" ) );
 }

 @PostMapping ( "/questions" )
 public Question addQuestion ( @RequestBody Question question ) {
  return cmsService.addQuestion( question )
                   .orElseThrow( () -> new ResponseStatusException( HttpStatus.BAD_REQUEST,
                           "Question: " + question.getId() + " could not be added" ) );
 }*/

}
