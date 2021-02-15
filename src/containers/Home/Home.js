import React, { useState } from 'react';
import { checkThisQuestion, missedThisQuestion, selectNextQuestion, timeOutLimesZero } from '../../common/helper';
import Congratulations from './Congratulations/Congratulations';
import Grid from './Grid/Grid';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState('empty');

  const onMissed = (question) => setQuestions(
    selectNextQuestion(missedThisQuestion(question, questions)),
  );
  const onChecked = (question) => setQuestions(
    selectNextQuestion(checkThisQuestion(question, questions)),
  );

  return (
    <>
      <Congratulations
        setQuestions={(returnedQuestions) => setQuestions(returnedQuestions)}
        setGameMode={setGameMode}
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
