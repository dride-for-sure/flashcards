import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import { validate as uuidValidate } from 'uuid';
import FAQ from '../../components/Tiles/FAQ/FAQ';
import Logo from '../../components/Tiles/Logo/Logo';
import NewGame from '../../components/Tiles/NewGame/NewGame';
import NoAvailableGames from '../../components/Tiles/NoAvailableGames/NoAvailableGames';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { listAvailableGames } from '../../services/APIService';

export default function Lobby() {
  const [playerDetails] = usePlayerDetails();
  const [games, setGames] = useState();
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

  const getInitialAvailableGames = () => {
    listAvailableGames()
      .then(setGames)
      .catch(() => console.error('No open games found'));
  };

  return (
    <>
      <SockJsClient
        url="/ws"
        topics={['/topic/games']}
        onConnect={() => {
          getInitialAvailableGames();
        }}
        onMessage={(data) => setGames(data.gameDtoList)} />
      <Logo />
      <FAQ playerName={playerDetails.name} />

      <NewGame onGameOpen={handleOpenNewGame} />
      <NoAvailableGames />
      {games && games.map((game) => <OpenGame key={game.id} game={game} />)}
    </>
  );
}
