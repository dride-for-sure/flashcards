import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import ScoreBar from '../../components/Charts/ScoreBar/ScoreBar';
import Charts from '../../components/Charts/styles';
import Results from '../../components/Results/Results';
import GameMaster from '../../components/Tiles/GameMaster/GameMaster';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import Question from '../../components/Tiles/Question/Question';
import Waiting from '../../components/Tiles/Waiting/Waiting';
import { usePlayerDetails } from '../../contexts/playerDetails';

export default function Game() {
  const [game, setGame] = useState();
  const [playerDetails] = usePlayerDetails();
  const [webSocket, setWebSocket] = useState();
  const { difficulty, gameId } = useParams();
  const history = useHistory();

  const handleGameUpdates = () => {
    const socket = new window.WebSocket(`ws://localhost:8080/api/games/${difficulty}/${gameId}/${playerDetails.id}`) || {};
    socket.onopen = () => {
      console.log('Socket Open');
      setWebSocket(socket);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Socket closed expected: ', event.code, event.reason);
      } else {
        console.log('Socket closed unexpected: ', event.code, event.reason);
      }
      // Try reconnect, finally show error
    };

    socket.onmessage = (event) => {
      console.log('Socket Message: ', event);
      setGame(JSON.parse(event.data));
    };

    socket.onerror = (event) => {
      console.log('Socket Error: ', event);
    };
  };

  const handleSendAnswer = (id, choice) => {
    console.log('Socket send answer:', choice);
    webSocket.send(JSON.stringify({ id, choice }));
  };

  const handleCloseWebsocket = () => {
    console.log('Player leaves the game -> socket close');
    webSocket.close(1001, 'Player leaves the game');
  };

  const handleGameStart = () => {
    const socket = new window.WebSocket(`ws://localhost:8080/api/games/${difficulty}/${gameId}`) || {};
    socket.onopen = () => {
      console.log('Socket send game start');
      socket.send(JSON.stringify({ id: gameId, gameMaster: playerDetails.id, start: true }));
      socket.close(1000, 'Game has been started');
    };
  };

  const handleGameRestart = () => {
    history.push('/');
  };

  useEffect(() => {
    handleGameUpdates();
    return () => {
      if (webSocket) { handleCloseWebsocket(); }
    };
  }, []);

  if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
    history.push('/');
    return null;
  }

  if (!game) {
    return (
      <Loading />
    );
  }

  return (
    <>
      {game.status === 'finish'
      && (
      <Results
        results={game.results}
        playerDetails={playerDetails}
        onGameRestart={handleGameRestart} />
      )}
      <Logo />
      {game.gameMaster.id === playerDetails.id
      && <GameMaster onClick={handleGameStart} />}
      {game.gameMaster.id !== playerDetails.id
      && <Waiting gameMasterName={game.gameMaster.name} />}
      {game.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onClick={handleSendAnswer} />
      ))}
      <Charts>
        {game.playerList.map((player) => (
          <ScoreBar
            key={player.id}
            player={player}
            playerDetails={playerDetails} />
        ))}
      </Charts>
    </>
  );
}
