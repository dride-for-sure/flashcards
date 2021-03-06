import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import Logo from '../../components/Tiles/Logo/Logo';
import NewGame from '../../components/Tiles/NewGame/NewGame';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import Title from '../../components/Tiles/Title/Title';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { useSocket } from '../../contexts/socket';
import { listAvailableGames } from '../../services/APIService';

export default function Lobby() {
  const [playerDetails] = usePlayerDetails();
  const { games, setGames } = useSocket();
  const history = useHistory();

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      history.push('/');
    }
    listAvailableGames()
      .then(setGames)
      .catch(() => console.error('Ninja-like the server is somehow not. Try gain... (Network Error'));
  }, []);

  const handleOpenNewGame = (difficulty) => {
    history.push(`/game/${difficulty}`);
  };

  return (
    <>
      <Logo />
      <Title />
      <NewGame onGameOpen={handleOpenNewGame} />
      {games && games.map((game) => <OpenGame key={game.id} game={game} />)}
    </>
  );
}
