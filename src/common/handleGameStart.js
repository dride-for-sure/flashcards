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
  res, difficulty, possibleQuestions, setQuestions, maxDelay, iteration, clearTimer,
) => {
  const updatedIteration = iteration + 1;
  const updatedDelay = 1.1 ** updatedIteration;
  const updatedQuestions = addRandomQuestion(difficulty, possibleQuestions, 5);
  setQuestions(updatedQuestions);

  if (updatedDelay > maxDelay) {
    clearTimeout(clearTimer);
    res(updatedQuestions);
    return;
  }

  const timer = setTimeout(() => selectAndShuffleQuestions(
    res, difficulty, possibleQuestions, setQuestions, maxDelay, updatedIteration, timer,
  ), updatedDelay);
};

const countdown = (res, setCountdown, count, clearTimer) => {
  setCountdown(count);
  if (count === 0) {
    clearTimeout(clearTimer);
    res();
    return;
  }
  const countLeft = count - 1;
  const timer = setTimeout(() => countdown(res, setCountdown, countLeft, timer), 1000);
};

// TODO:
// Wait for Backend to receive common flashcards for this round
// setQuestions(selectNextQuestion(cardsFromBackend));

const handleGameStart = async (
  difficulty, possibleQuestions, setQuestions, setGameMode, setCountdown,
) => {
  setGameMode('countdown');
  await new Promise((res) => {
    countdown(res, setCountdown, 5);
  });
  setGameMode('shuffle');
  const shuffledQuestions = await new Promise((res) => {
    selectAndShuffleQuestions(res, difficulty, possibleQuestions, setQuestions, 800, 1);
  });
  setGameMode('play');
  setQuestions(selectNextQuestion(shuffledQuestions));
};

export default handleGameStart;
