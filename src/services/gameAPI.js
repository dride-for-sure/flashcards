import axios from 'axios';

export const joinLobby = (player) => axios.post('/api/lobby', player)
  .then((response) => response.data)
  .catch((error) => console.log('POST:', error));

export const sendAnswers = (player, game) => axios.put(`/api/games/${game.id}/${player.id}`, player)
  .then((response) => response.data)
  .catch((error) => console.log('PUT:', error));
