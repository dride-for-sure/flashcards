import React from 'react';
import { nerdfactorIcon } from '../../common/helper';
import useGameState from '../../hooks/useGameState';
import possibleQuestions from '../../store/store';
import Congrats from './Congrats/Congrats';
import { handleCongratsClick, handlePlayClick, handleQuestionClick, handleShuffleClick } from './eventHandler';
import Grid from './Grid/Grid';

export default function Game() {
  const [
    questions,
    setQuestions,
    gameMode,
    setGameMode,
    results,
  ] = useGameState();

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
      />
    </>
  );
}
