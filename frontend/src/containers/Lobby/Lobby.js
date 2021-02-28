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
  const [webSocket, setWebSocket] = useState();
  const history = useHistory();

  const handleListGames = (data) => {
    setGames(JSON.parse(data));
  };

  const handleOpenNewGame = (difficulty) => {
    history.push(`/games/${difficulty}/${uuidv4()}`);
  };

  const handleWebsocketConnection = () => {
    const socket = new window.WebSocket('ws://localhost:8080/api/games') || {};
    socket.onopen = () => {
      console.log('Socket Open, send playerDetails');
      setWebSocket(socket);
      socket.send(JSON.stringify(playerDetails));
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Socket closed expected: ', event.code, event.reason);
      } else {
        console.log('Socket closed unexpected: ', event.code, event.reason);
      }
      // Try reconnect -> display error else
      // alert('The mortal coding combat is temporarily not available. Please come back later...');
    };

    socket.onmessage = (event) => {
      console.log('Socket Message: ', event);
      handleListGames(event.data);
    };

    socket.onerror = (event) => {
      console.log('Socket Error: ', event);
    };
  };

  const closeWebsocket = () => {
    console.log('Player leaves the lobby -> socket close');
    webSocket.close(1001, 'Player leaves the lobby');
  };

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) { history.push('/'); }
    handleWebsocketConnection();
    return () => {
      if (webSocket) { closeWebsocket(); }
    };
  }, []);

  return (
    <>
      <Logo />
      <Title />
      <OpenGame onGameOpen={handleOpenNewGame} />
      {games.map((game) => <Game key={game.id} game={game} />)}
    </>
  );
}
