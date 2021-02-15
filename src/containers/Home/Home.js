import React, { useState } from 'react';
import { checkThisQuestion, missedThisQuestion, selectRandomQuestion, timeOutLimesZero } from '../../common/helper';
import Congratulations from './Congratulations/Congratulations';
import Grid from './Grid/Grid';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState('empty'); // empty, shuffle, prepared, play, finish

  return (
    <>
      <Congratulations
        setQuestions={(returned) => setQuestions(returned)}
        setGameMode={setGameMode}
      />
      <Grid
        questions={questions}
        onMissed={(id) => {
          setQuestions(selectRandomQuestion(missedThisQuestion(id, questions)));
        }}
        onChecked={(id) => {
          setQuestions(selectRandomQuestion(checkThisQuestion(id, questions)));
        }}
        shuffleQuestions={(returned) => {
          timeOutLimesZero(returned, setQuestions, setGameMode, 1000, 0);
        }}
        setQuestions={(returned) => setQuestions(returned)}
        gameMode={gameMode}
        setGameMode={(returned) => setGameMode(returned)}
      />
    </>
  );
}
