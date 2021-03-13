import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import FAQ from '../../components/Tiles/FAQ/FAQ';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import NewGame from '../../components/Tiles/NewGame/NewGame';
import NoAvailableGames from '../../components/Tiles/NoAvailableGames/NoAvailableGames';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import addNotification from '../../contexts/notifications';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { useSocket } from '../../contexts/socket';

export default function Lobby() {
  const { gameList, socket } = useSocket();
  const [playerDetails] = usePlayerDetails();
  const history = useHistory();

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (!socket) {
      addNotification('Connection to the game arena could not established. Please try again later! (Websocket Error)');
    }
  }, [socket]);

  const handleNewGame = (difficulty) => {
    history.push(`/game/${difficulty}/${uuidv4()}`);
  };

  if (!socket || !gameList) {
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
      <FAQ playerName={playerDetails.name} />
      <NewGame onGameOpen={handleNewGame} />
      {!gameList && <NoAvailableGames />}
      {gameList && gameList.map((game) => <OpenGame key={game.id} game={game} />)}
    </>
  );
}
