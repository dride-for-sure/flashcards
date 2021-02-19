import { deleteAllQuestions } from './handleQuestions';

export const handleCongrats = (setQuestions, setGameMode) => {
  setQuestions(deleteAllQuestions());
  setGameMode('lobby');
};

export const calcResult = (questions) => {
  const missed = questions.reduce((acc, value) => (value.status === 'missed' ? acc + 1 : acc), 0);
  const checked = questions.reduce((acc, value) => (value.status === 'checked' ? acc + 1 : acc), 0);

  return {
    missed,
    checked,
    total: missed + checked,
  };
};
