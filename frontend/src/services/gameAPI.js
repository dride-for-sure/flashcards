import axios from 'axios';

export const joinGame = (player) => axios
  .post('/api/lobby', player)
  .then((response) => response.data)
  .catch((error) => {
    console.log('JOIN GAME:', error);
    return '';
  });

export const sendAnswer = (player, game, cards) => axios
  .put(`/api/games/${game.id}/${player.id}`, cards)
  .then((response) => response.data)
  .catch((error) => {
    console.log('SEND ANSWER:', error);
  });

export const startGame = (player, game, level) => axios
  .post(`/api/games/${game.id}/${player.id}`, { id: game.id, level })
  .catch((error) => {
    console.log('START GAME:', error);
  });
