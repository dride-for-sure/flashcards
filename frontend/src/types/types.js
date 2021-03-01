import { arrayOf, number, shape, string } from 'prop-types';

export const masterType = shape({
  id: string,
  name: string,
});

export const playerType = shape({
  id: string,
  name: string,
  score: number,
});

export const playerListType = arrayOf(playerType);

export const questionListItemType = shape({
  id: string,
  status: string,
  difficulty: number,
  category: string,
  question: string,
  answers: arrayOf(string),
  icon: string,
  points: number,
});

export const questionListType = arrayOf(questionListItemType);

export const gameType = shape({
  id: string,
  status: string,
  master: masterType,
  playerList: playerListType,
  questionList: questionListType,
  maxPoints: number,
});

export const gamesListItemType = shape({
  id: string,
  difficulty: number,
  icon: string,
  master: masterType,
});

export const gamesListType = arrayOf(gamesListItemType);

export const playerDetailsType = shape({
  id: string,
  name: string,
});

export const startGameType = {
  id: string,
  master: masterType,
  start: true,
};
