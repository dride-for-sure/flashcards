package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.config.GameConfig;
import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import com.dennisjauernig.flashcards.controller.model.QuestionDtoList;
import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.model.Question;
import com.dennisjauernig.flashcards.model.QuestionDao;
import com.dennisjauernig.flashcards.model.enums.QuestionStatus;
import com.dennisjauernig.flashcards.model.enums.Topic;
import com.dennisjauernig.flashcards.repository.QuestionDb;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionsService {

 public final QuestionDb questionDb;
 private final GameConfig gameConfig;

 public QuestionsService ( GameConfig gameConfig, QuestionDb questionDb ) {
  this.gameConfig = gameConfig;
  this.questionDb = questionDb;
 }

 // √ Get the QuestionList as Dto from existing game
 public List<QuestionDto> getQuestionListDto ( Game game, UUID playerId ) {
  return game.getPlayerList()
             .stream()
             .filter( targetPlayer -> targetPlayer.getId().equals( playerId ) )
             .findFirst()
             .orElseThrow( () -> new IllegalArgumentException( "PlayerId: " + playerId +
                     " does not exists" ) )
             .getQuestionDtoList();
 }

 // √ Convert questionList to dto
 public List<QuestionDto> convertQuestionListToDto ( List<Question> questionList ) {
  return questionList.stream()
                     .map( question -> convertQuestionToDto( question ) )
                     .collect( Collectors.toList() );
 }

 // √ Convert a question to its dto
 public QuestionDto convertQuestionToDto ( Question question ) {
  return QuestionDto.builder()
                    .id( question.getId() )
                    .status( question.getFirstQuestion() ? QuestionStatus.SELECTED : QuestionStatus.NONE )
                    .topic( question.getTopic() )
                    .category( question.getCategory() )
                    .question( question.getQuestion() )
                    .answers( question.getAnswers() )
                    .build();
 }

 // √ Select the next question with question status SELECTED, if possible
 public List<QuestionDto> selectNextQuestionFromList ( List<QuestionDto> questionDtoList ) {
  List<QuestionDto> questionListStatusNONE = questionDtoList
          .stream()
          .filter( questionDto -> questionDto.getStatus().equals( QuestionStatus.NONE ) )
          .collect( Collectors.toList() );
  List<QuestionDto> questionListStatusSELECTED = questionDtoList
          .stream()
          .filter( questionDto -> questionDto.getStatus().equals( QuestionStatus.SELECTED ) )
          .collect( Collectors.toList() );

  if ( questionListStatusNONE.size() > 0 && questionListStatusSELECTED.size() == 0 ) {
   QuestionDto nextQuestion = questionListStatusNONE
           .get( ( int ) ( Math.random() * questionListStatusNONE.size() ) )
           .toBuilder()
           .status( QuestionStatus.SELECTED )
           .build();
   return questionDtoList.stream()
                         .map( questionDto -> questionDto.getId().equals( nextQuestion.getId() )
                                 ? nextQuestion
                                 : questionDto )
                         .collect( Collectors.toList() );
  }
  return questionDtoList;
 }

 // √ Sum the points in a given questionDtoList
 public int getScoreFromQuestionList ( List<QuestionDto> questionDtoList ) {
  return questionDtoList.stream()
                        .map( questionDto -> questionDto.getPoints() )
                        .reduce( 0, Integer::sum );
 }

 // √ Calculate maximal possible Points for a given game
 public int calcMaxPoints ( Game game ) {
  return game.getQuestionList().size();
 }

 // √ Generate a fresh questionList
 public List<Question> generateQuestionList ( Topic topic ) {
  return selectFirstQuestion( selectRandomQuestionsFromList( filterQuestionListByTopic( topic ) ) );
 }

 // √ Select a random first question
 private List<Question> selectFirstQuestion ( List<Question> questionList ) {
  int randomIndex = ( int ) ( Math.random() * questionList.size() );
  List<Question> listToUpdate = new ArrayList<>( questionList );
  listToUpdate.set( randomIndex, setAsFirstQuestion( listToUpdate.get( randomIndex ) ) );
  return listToUpdate;
 }

 // √ Set first question status
 private Question setAsFirstQuestion ( Question question ) {
  return question.toBuilder().firstQuestion( true ).build();
 }

 // √ Select random questions from a given questionList with respect to maxQuestions
 private List<Question> selectRandomQuestionsFromList ( List<Question> questionsList ) {
  List<Question> chosenQuestions = new ArrayList<>();
  do {
   Question possibleQuestion = questionsList.get( ( int ) ( Math.random() * questionsList.size() ) );
   if ( !chosenQuestions.contains( possibleQuestion ) ) {
    chosenQuestions.add( possibleQuestion );
   }
  } while ( chosenQuestions.size() < questionsList.size()
          && chosenQuestions.size() < gameConfig.getMaxQuestions() );
  return chosenQuestions;
 }

 // √ Filter a questionList by topic
 private List<Question> filterQuestionListByTopic ( Topic topic ) {
  return listQuestions().stream().filter( question ->
          question.getTopic().equals( topic ) ).collect( Collectors.toList() );
 }

 // √ List questions
 private List<Question> listQuestions () {
  List<QuestionDao> questionDaoList = questionDb.findAll();
  return questionDaoList.stream().map( questionDao ->
          Question.builder()
                  .id( questionDao.getId() )
                  .topic( questionDao.getTopic() )
                  .category( questionDao.getCategory() )
                  .question( questionDao.getQuestion() )
                  .answers( questionDao.getAnswers() )
                  .solution( questionDao.getSolution() )
                  .firstQuestion( false )
                  .build() ).collect( Collectors.toList() );
 }

 // √ Add type to list
 public QuestionDtoList addTypeToQuestionDtoList ( List<QuestionDto> questionDtoList ) {
  return QuestionDtoList.builder().questionDtoList( questionDtoList ).build();
 }
}
