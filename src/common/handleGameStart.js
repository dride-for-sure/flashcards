import { selectNextQuestion } from './handleQuestions';
import uuid from './uuid';

const addRandomQuestion = (
  difficulty, possibleQuestions, total,
) => {
  let filteredQuestions;
  if (difficulty === 'easy') {
    filteredQuestions = possibleQuestions.filter(
      (question) => question.nerdfactor === '1',
    );
  } else if (difficulty === 'moderat') {
    filteredQuestions = possibleQuestions.filter(
      (question) => question.nerdfactor !== '3',
    );
  } else {
    filteredQuestions = possibleQuestions;
  }
  const updatedQuestions = [];
  for (let i = 0; i < total; i += 1) {
    updatedQuestions.push({
      id: uuid(),
      ...filteredQuestions[
        Math.floor(Math.random() * filteredQuestions.length)
      ],
    });
  }
  return updatedQuestions;
};

const selectAndShuffleQuestions = (
  res, difficulty, possibleQuestions, setQuestions, maxDelay, iteration,
) => {
  const updatedIteration = iteration + 1;
  const updatedDelay = 1.1 ** updatedIteration;
  const updatedQuestions = addRandomQuestion(difficulty, possibleQuestions, 5);
  setQuestions(updatedQuestions);

  if (updatedDelay > maxDelay) {
    res(updatedQuestions);
    return;
  }

  setTimeout(() => selectAndShuffleQuestions(
    res, difficulty, possibleQuestions, setQuestions, maxDelay, updatedIteration,
  ), updatedDelay);
};

// TODO:
// Wait for Backend to receive common flashcards for this round
// setQuestions(selectNextQuestion(cardsFromBackend));

const handleGameStart = async (
  difficulty, possibleQuestions, setQuestions, setGameMode,
) => {
  setGameMode('shuffle');
  const shuffledQuestions = await new Promise((res) => {
    selectAndShuffleQuestions(res, difficulty, possibleQuestions, setQuestions, 800, 1);
  });
  setGameMode('play');
  setQuestions(selectNextQuestion(shuffledQuestions));
};

export default handleGameStart;
