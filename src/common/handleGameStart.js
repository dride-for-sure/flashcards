import { selectNextQuestion } from './handleQuestions';

const shuffleCards = (
  res, cards, setCards, maxDelay, iteration, clearTimer,
) => {
  const updatedIteration = iteration + 1;
  const updatedDelay = 1.1 ** updatedIteration;

  const sourceCards = [...cards];
  const updatedCards = [];

  while (sourceCards.length > 0) {
    const random = Math.floor(Math.random() * sourceCards.length);
    updatedCards.push(sourceCards.splice(random, 1));
  }

  setCards(updatedCards);

  if (updatedDelay > maxDelay) {
    clearTimeout(clearTimer);
    res(updatedCards);
    return;
  }

  const timer = setTimeout(() => shuffleCards(
    res, cards, setCards, maxDelay, updatedIteration, timer,
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

const handleGameStart = async (
  game, history, cards, setCards, setCountdown,
) => {
  await new Promise((res) => {
    countdown(res, setCountdown, 10);
  });
  history.push(`/play/${game.id}`);
  const shuffledCards = await new Promise((res) => {
    shuffleCards(res, cards, setCards, 800, 1);
  });
  setCards(selectNextQuestion(shuffledCards));
};

export default handleGameStart;
