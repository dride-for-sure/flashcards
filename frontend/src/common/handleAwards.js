import { deleteAllCards } from './handleAnswers';

export const handleGameRestart = (setQuestions, setGameMode) => {
  setQuestions(deleteAllCards());
  setGameMode('lobby');
};

export const calcGameResults = (game) => {
  let n = 0;
  const ranking = game.players
    .sort((a, b) => b.points - a.points)
    .reduce((acc, player) => {
      if (acc.length === 0) {
        acc.push({ ...player, position: 1 });
      } else if (acc[acc.length - 1].points === player.points) {
        acc.push({ ...player, position: acc[acc.length - 1].position });
        n += 1;
      } else {
        acc.push({ ...player, position: acc[acc.length - 1].position + n + 1 });
        n = 0;
      }
      return acc;
    }, []);
  return {
    ranking,
    maxPoints: game.maxPoints };
};
