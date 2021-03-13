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
  topic: string,
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
  topic: string,
  icon: string,
  master: masterType,
});

export const gamesListType = arrayOf(gamesListItemType);

export const topics = shape({
  name: string,
  questionCount: number,
});

export const topicList = arrayOf(topics);

export const playerDetailsType = shape({
  id: string,
  name: string,
});

export const startGameType = {
  master: masterType,
  start: true,
};
