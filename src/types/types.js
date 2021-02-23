import { arrayOf, func, number, shape, string } from 'prop-types';

export const gameType = shape({
  id: string,
  status: string,
  players: arrayOf(shape({
    id: string,
    name: string,
    points: number,
  })),
  cards: arrayOf(shape({
    id: string,
    level: number,
    subject: string,
    question: string,
    choices: arrayOf(string),
  })),
  maxPoints: number,
});

export const playerType = shape({
  id: string,
  name: string,
  points: number,
});

export const resultsType = shape({
  ranking: arrayOf(shape({
    id: string,
    name: string,
    points: number,
    position: number,
  })),
  maxPoints: number,
});

export const calcPlayerScoreColorType = func;
export const calcPlayerScoreWidthType = func;
export const onCardAnsweredType = func;
export const setPlayerType = func;
export const countdownType = number;
export const onGameStartType = func;
export const onGameRestartType = func;
export const setGameType = func;
