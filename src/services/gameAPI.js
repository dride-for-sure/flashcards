import axios from 'axios';

export const joinGame = (player) => axios.post('/api/lobby', player)
  .then((response) => response.data)
  .catch((error) => console.log('POST:', error));

export const sendAnswer = (player, game, cards) => axios
  .put(`/api/games/${game.id}/${player.id}`, cards)
  .catch((error) => console.log('PUT:', error));

export const startGame = (player, game, level) => axios
  .post(`/api/games/${game.id}/${player.id}`, { id: game.id, level });
