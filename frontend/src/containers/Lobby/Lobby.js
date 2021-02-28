import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import Game from '../../components/Tiles/Game/Game';
import Logo from '../../components/Tiles/Logo/Logo';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import Title from '../../components/Tiles/Title/Title';
import { usePlayerDetails } from '../../contexts/playerDetails';

export default function Lobby() {
  const [games, setGames] = useState([]);
  const [playerDetails] = usePlayerDetails();
  const history = useHistory();

  const handleListGames = (data) => {
    setGames(JSON.parse(data));
  };

  const handleOpenNewGame = (difficulty) => {
    history.push(`/games/${difficulty}/${uuidv4()}`);
  };

  const startWebsocketConnection = () => {
    const socket = new window.WebSocket('ws://localhost:8080/api/games') || {};
    socket.onopen = () => {
      console.log('Socket Open, send playerDetails');
      socket.send(JSON.stringify(playerDetails));
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Socket closed expected: ', event.code, event.reason);
      } else {
        console.log('Socket closed unexpected: ', event.code, event.reason);
      }
    };

    socket.onmessage = (event) => {
      console.log('Socket Message: ', event);
      handleListGames(event.data);
    };

    socket.onerror = (event) => {
      console.log('Socket Error: ', event);
    };
  };

  useEffect(() => {
    startWebsocketConnection();
  }, []);

  if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) { history.push('/'); }

  return (
    <>
      <Logo />
      <Title />
      <OpenGame onGameOpen={handleOpenNewGame} />
      {games.map((game) => <Game key={game.id} game={game} />)}
    </>
  );
}
