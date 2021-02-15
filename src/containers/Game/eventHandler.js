import { addRandomQuestion, checkThisQuestion, deleteAllQuestions, missedThisQuestion, selectNextQuestion, timeOutLimesZero } from '../../common/helper';

export const handleCongratsClick = (setQuestions, setGameMode) => {
  setQuestions(deleteAllQuestions());
  setGameMode('empty');
};

export const handlePlayClick = (gameMode, setGameMode, questions, setQuestions) => {
  if (gameMode === 'prepared') {
    setGameMode('play');
    setQuestions(selectNextQuestion(questions));
  } else {
    setGameMode('empty');
    setQuestions(deleteAllQuestions());
  }
};

export const handleShuffleClick = (difficulty, setGameMode, possibleQuestions, setQuestions) => {
  setGameMode('shuffle');
  timeOutLimesZero(
    addRandomQuestion(
      difficulty,
      possibleQuestions,
      5,
    ), setQuestions, setGameMode, 1000, 0,
  );
};

export const handleQuestionClick = (question, questions, setQuestions, answerClicked) => (
  question.answer[answerClicked].correct === true
    ? setQuestions(
      selectNextQuestion(missedThisQuestion(question, questions)),
    )
    : setQuestions(
      selectNextQuestion(checkThisQuestion(question, questions)),
    )
);
