import React, { useEffect, useState } from 'react';
import { handlePlayerScoreColor, handlePlayerScoreWidth } from '../../common/handleCharts';
import { calcResult, handleCongrats } from '../../common/handleCongrats';
import handleGameStart from '../../common/handleGameStart';
import { handleQuestions } from '../../common/handleQuestions';
import playersDb from '../../store/playersDb';
import possibleQuestions from '../../store/store';
import Congrats from './Congrats/Congrats';
import Grid from './Grid/Grid';

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState('lobby'); // lobby, play, finish
  const [results, setResults] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(playersDb);
  });

  useEffect(() => {
    setResults(calcResult(questions));
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && questions.length === results.total) {
      setGameMode('finish');
    }
  }, [results]);

  return (
    <>
      {gameMode === 'finish' && (
      <Congrats
        handleCongratsClick={() => handleCongrats(setQuestions, setGameMode)}
        results={results}
      />
      )}
      <Grid
        questions={questions}
        gameMode={gameMode}
        setGameMode={(returnedGameMode) => setGameMode(returnedGameMode)}
        onStartGameClick={(difficulty) => {
          handleGameStart(difficulty, possibleQuestions, setQuestions, setGameMode);
        }}
        onQuestionClick={(question, answerClicked) => {
          handleQuestions(question, questions, setQuestions, answerClicked);
        }}
        players={players}
        calcPlayerScoreColor={
          (player, setBarColor) => handlePlayerScoreColor(player, questions, setBarColor)
}
        calcPlayerScoreWidth={
          (player, setBarWidth) => handlePlayerScoreWidth(player, questions, setBarWidth)
}
      />
    </>
  );
}
