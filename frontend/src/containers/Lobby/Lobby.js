import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import Logo from '../../components/Tiles/Logo/Logo';
import NewGame from '../../components/Tiles/NewGame/NewGame';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import Title from '../../components/Tiles/Title/Title';
import { usePlayerDetails } from '../../contexts/playerDetails';

export default function Lobby() {
  const [games, setGames] = useState([]);
  const [playerDetails] = usePlayerDetails();
  const [webSocket, setWebSocket] = useState();
  const history = useHistory();

  const handleLobbyUpdates = () => {
    const socket = new window.WebSocket('ws://localhost:8080/api/games') || {};
    let timeout = 250;
    let reconnectInterval;

    socket.onopen = () => {
      console.log('Socket Open, send playerDetails');
      setWebSocket(socket);
      socket.send(JSON.stringify(playerDetails));
      clearTimeout(reconnectInterval);
      timeout = 250;
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Socket closed expected: ', event.code, event.reason);
      } else {
        console.log('Socket closed unexpected: ', event.code, event.reason);
        timeout += timeout;
        if (!socket || socket.readyState === WebSocket.CLOSED) {
          console.log('Socket reconnect');
          reconnectInterval = setTimeout(handleLobbyUpdates(), Math.min(5000, timeout));
        }
      }
    };

    socket.onmessage = (event) => {
      console.log('Socket Message: ', event);
      setGames(JSON.parse(event.data));
    };

    socket.onerror = (event) => {
      console.log('Socket Error: ', event);
    };
  };

  const handleCloseWebsocket = () => {
    console.log('Player leaves the lobby -> socket close');
    webSocket.close(1001, 'Player leaves the lobby');
  };

  const handleOpenNewGame = (difficulty) => {
    history.push(`/games/${difficulty}/${uuidv4()}`);
  };

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) { history.push('/'); }
    handleLobbyUpdates();
    return () => {
      if (webSocket) {
        handleCloseWebsocket();
      }
    };
  }, []);

  return (
    <>
      <Logo />
      <Title />
      <NewGame onGameOpen={handleOpenNewGame} />
      {games.map((game) => <OpenGame key={game.id} game={game} />)}
    </>
  );
}
