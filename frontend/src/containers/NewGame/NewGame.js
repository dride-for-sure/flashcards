import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import ScoreBar from '../../components/Charts/ScoreBar/ScoreBar';
import Charts from '../../components/Charts/styles';
import GameMaster from '../../components/Tiles/GameMaster/GameMaster';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import { useNotifications } from '../../contexts/notifications';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { useSocket } from '../../contexts/socket';
import { newGame, startGame } from '../../services/APIService';

export default function NewGame() {
  const [playerDetails] = usePlayerDetails();
  const { game, setGame, socks, socksConnected } = useSocket();
  const [addNotification] = useNotifications();
  const { difficulty } = useParams();
  const history = useHistory();

  const getInitialGame = () => {
    newGame(difficulty, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch(() => addNotification('Pow! Bang! Slapstick Action! But...not today!(Network Error)'));
  };

  const handleGameStart = () => {
    startGame(game.id, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch(() => addNotification('Your ninja is need of sleep! Sorry. (Network Error)'));
  };

  const handleDisconnect = () => {
    if (socksConnected) {
      socks.sendMessage(`/api/user/${game.id}`);
    }
  };

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      history.push('/');
    }
    getInitialGame();
    return (() => {
      handleDisconnect();
    });
  }, []);

  useEffect(() => {
    if (game && game.status === 'PLAY') {
      history.push(`/game/${difficulty}/${game.id}`);
    }
  }, [game]);

  if (!game) {
    return (
      <>
        <Logo />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Logo />
      <GameMaster onGameStart={handleGameStart} />
      <Charts>
        {game.playerList.map((player) => (
          <ScoreBar
            key={player.id}
            maxPoints={game.maxPoints}
            player={player}
            playerDetails={playerDetails} />
        ))}
      </Charts>
    </>
  );
}
