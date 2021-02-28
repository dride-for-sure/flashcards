import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Game from '../../components/Tiles/Game/Game';
import Logo from '../../components/Tiles/Logo/Logo';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import Title from '../../components/Tiles/Title/Title';
import { usePlayerDetails } from '../../contexts/playerDetails';

export default function Lobby() {
  const [games, setGames] = useState([]);
  const [playerName] = usePlayerDetails();
  const history = useHistory();

  const handleListGames = (data) => {
    setGames(JSON.parse(data));
  };

  const handleOpenNewGame = (difficulty) => {
    history.push(`/games/${difficulty}/${uuidv4()}`);
  };

  const startWebsocketConnection = () => {
    const ws = new window.WebSocket('ws://localhost:8080/api/games') || {};
    ws.onopen = () => {
      console.log('Opened socket');
    };

    ws.onclose = (e) => {
      console.log('Close socket: ', e.code, e.reason);
    };

    ws.onmessage = (e) => {
      console.log('Message:', e);
      handleListGames(e.data);
    };
  };

  useEffect(() => {
    startWebsocketConnection();
  }, []);

  if (!playerName) {
    history.push('/');
    return null;
  }

  return (
    <>
      <Logo />
      <Title />
      <OpenGame onGameOpen={handleOpenNewGame} />
      {games.map((game) => <Game key={game.id} game={game} />)}
    </>
  );
}
