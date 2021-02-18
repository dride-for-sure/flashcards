import React, { useEffect, useState } from 'react';
import { calcResult, nerdfactorIcon } from '../../common/helper';
import playersDb from '../../store/playersDb';
import possibleQuestions from '../../store/store';
import Congrats from './Congrats/Congrats';
import { handleCongratsClick, handlePlayClick, handleQuestionClick, handleShuffleClick } from './eventHandler';
import Grid from './Grid/Grid';

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState('lobby');
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
        handleCongratsClick={() => handleCongratsClick(setQuestions, setGameMode)}
        results={results}
      />
      )}
      <Grid
        questions={questions}
        gameMode={gameMode}
        setGameMode={(returnedGameMode) => setGameMode(returnedGameMode)}
        onPlayClick={() => handlePlayClick(gameMode, setGameMode, questions, setQuestions)}
        onShuffleClick={
          (difficulty) => {
            handleShuffleClick(difficulty, setGameMode, possibleQuestions, setQuestions);
          }
        }
        onQuestionClick={
          (question, answerClicked) => {
            handleQuestionClick(question, questions, setQuestions, answerClicked);
          }
        }
        getNerdfactorIcon={(question) => nerdfactorIcon(question)}
        players={players}
      />
    </>
  );
}
