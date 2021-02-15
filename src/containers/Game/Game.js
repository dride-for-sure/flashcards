import React, { useEffect, useState } from 'react';
import { calcResult, checkThisQuestion, deleteAllQuestions, missedThisQuestion, selectNextQuestion, timeOutLimesZero } from '../../common/helper';
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

  const onMissed = (question) => setQuestions(
    selectNextQuestion(missedThisQuestion(question, questions)),
  );
  const onChecked = (question) => setQuestions(
    selectNextQuestion(checkThisQuestion(question, questions)),
  );
  const handleCongratsClick = () => {
    setQuestions(deleteAllQuestions());
    setGameMode('empty');
  };

  return (
    <>
      <Congrats
        gameMode={gameMode}
        handleCongratsClick={handleCongratsClick}
        results={results}
      />
      <Grid
        questions={questions}
        onMissed={(question) => {
          onMissed(question);
        }}
        onChecked={(question) => {
          onChecked(question);
        }}
        shuffleQuestions={(returnedQuestions) => {
          timeOutLimesZero(returnedQuestions, setQuestions, setGameMode, 1000, 0);
        }}
        setQuestions={(returnedQuestions) => setQuestions(returnedQuestions)}
        gameMode={gameMode}
        setGameMode={(returnedGameMode) => setGameMode(returnedGameMode)}
      />
    </>
  );
}
