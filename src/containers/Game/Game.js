import React, { useEffect, useState } from 'react';
import { addRandomQuestion, calcResult, checkThisQuestion, deleteAllQuestions, missedThisQuestion, nerdfactorIcon, selectNextQuestion, timeOutLimesZero } from '../../common/helper';
import possibleQuestions from '../../store/store';
import Congrats from './Congrats/Congrats';
import Grid from './Grid/Grid';

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState('empty');
  const [results, setResults] = useState({});

  useEffect(() => {
    setResults(calcResult(questions));
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && questions.length === results.total) {
      setGameMode('finish');
    }
  }, [results]);

  const handleCongratsClick = () => {
    setQuestions(deleteAllQuestions());
    setGameMode('empty');
  };
  const handlePlayClick = () => {
    if (gameMode === 'prepared') {
      setGameMode('play');
      setQuestions(selectNextQuestion(questions));
    } else {
      setGameMode('empty');
      setQuestions(deleteAllQuestions());
    }
  };
  const handleShuffleClick = (difficulty) => {
    setGameMode('shuffle');
    timeOutLimesZero(
      addRandomQuestion(
        difficulty,
        possibleQuestions,
        5,
      ), setQuestions, setGameMode, 1000, 0,
    );
  };
  const handleQuestionMissed = (question) => setQuestions(
    selectNextQuestion(missedThisQuestion(question, questions)),
  );
  const handleQuestionChecked = (question) => setQuestions(
    selectNextQuestion(checkThisQuestion(question, questions)),
  );
  const handleQuestionClick = (question) => (
    question.answer.a.correct === true
      ? handleQuestionMissed(question)
      : handleQuestionChecked(question)
  );

  return (
    <>
      {gameMode === 'finish' && (
      <Congrats
        handleCongratsClick={handleCongratsClick}
        results={results}
      />
      )}
      <Grid
        questions={questions}
        gameMode={gameMode}
        setGameMode={(returnedGameMode) => setGameMode(returnedGameMode)}
        onPlayClick={handlePlayClick}
        onShuffleClick={(difficulty) => handleShuffleClick(difficulty)}
        onQuestionClick={(question) => handleQuestionClick(question)}
        getNerdfactorIcon={(question) => nerdfactorIcon(question)}
      />
    </>
  );
}
