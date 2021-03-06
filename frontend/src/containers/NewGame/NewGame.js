import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import ScoreBar from '../../components/Charts/ScoreBar/ScoreBar';
import Charts from '../../components/Charts/styles';
import GameMaster from '../../components/Tiles/GameMaster/GameMaster';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import { useGameSocket } from '../../contexts/gameSocket';
import { useNotifications } from '../../contexts/notifications';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { newGame, startGame } from '../../services/APIService';

export default function NewGame() {
  const [playerDetails] = usePlayerDetails();
  const [game, setGame] = useGameSocket();
  const [addNotification] = useNotifications();
  const { difficulty } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      history.push('/');
    }
    newGame(difficulty, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch(() => addNotification('Pow! Bang! Slapstick Action! But...not today!(Network Error)'));
  }, []);

  useEffect(() => {
    if (game && game.status === 'PLAY') {
      history.push(`/game/${difficulty}/${game.id}`);
    }
  }, [game]);

  const handleGameStart = () => {
    startGame(game.id, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch(() => addNotification('Your ninja is need of sleep! Sorry. (Network Error)'));
  };

  if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
    history.push('/');
    return null;
  }

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
