package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.config.GameConfig;
import com.dennisjauernig.flashcards.controller.model.PlayerDto;
import com.dennisjauernig.flashcards.model.*;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuilderService {

 public final QuestionDb questionDb;
 private final GameConfig gameConfig;

 @Autowired
 public BuilderService ( QuestionDb questionDb, GameConfig gameConfig ) {
  this.questionDb = questionDb;
  this.gameConfig = gameConfig;
 }

 public Game gameBuilder (
         String gameId,
         Difficulty difficulty,
         PlayerDto playerDto ) {
  List<Question> questionsList = generateQuestionList( difficulty );
  Player player = playerBuilder( playerDto, questionsList );
  return Game.builder()
             .id( gameId )
             .difficulty( difficulty )
             .status( GameStatus.PREPARE )
             .master( GameMaster.builder()
                                .id( playerDto.getId() )
                                .name( playerDto.getName() )
                                .build() )
             .playerList( new ArrayList<>( Collections.singletonList( player ) ) )
             .build();
 }

 public Player playerBuilder (
         PlayerDto playerDto,
         List<Question> questionsList ) {
  return Player.builder()
               .id( playerDto.getId() )
               .name( playerDto.getName() )
               .questionList(
                       questionsList.stream()
                                    .map( question -> question.convertToInitDto() )
                                    .collect( Collectors.toList() ) )
               .build();
 }

 private List<Question> generateQuestionList ( Difficulty difficulty ) {
  return chooseQuestions( filterQuestionsByDifficulty( difficulty ) );
 }

 private List<Question> chooseQuestions ( List<Question> questionsList ) {
  List<Question> chosenQuestions = new ArrayList<>();
  while ( chosenQuestions.size() <= gameConfig.getMaxQuestions() ) {
   chosenQuestions.add( questionsList.get( ( int ) ( Math.random() * chosenQuestions.size() ) ) );
  }
  return chosenQuestions;
 }


 private List<Question> filterQuestionsByDifficulty ( Difficulty difficulty ) {
  return this.questionDb.findAll().stream().filter( question -> {
   if ( difficulty.equals( Difficulty.EASY ) ) {
    return question.getDifficulty().equals( Difficulty.EASY );
   } else if ( difficulty.equals( Difficulty.MODERATE ) ) {
    return question.getDifficulty().equals( Difficulty.EASY )
            || question.getDifficulty().equals( Difficulty.MODERATE );
   }
   return true;
  } ).collect( Collectors.toList() );
 }
}