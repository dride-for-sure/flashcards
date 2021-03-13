import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import FAQ from '../components/Tiles/FAQ';
import Loading from '../components/Tiles/Loading';
import Logo from '../components/Tiles/Logo';
import NewGame from '../components/Tiles/NewGame';
import NoAvailableGames from '../components/Tiles/NoAvailableGames';
import OpenGame from '../components/Tiles/OpenGame';
import { useNotifications } from '../contexts/notifications';
import { usePlayerDetails } from '../contexts/playerDetails';
import { useSocket } from '../contexts/socket';

export default function Lobby() {
  const { gameList, topicList, socket, socketState } = useSocket();
  const [playerDetails] = usePlayerDetails();
  const history = useHistory();
  const [addNotification] = useNotifications();

  const handleLobbyJoin = () => {
    try {
      socket.sendMessage('/api/games');
    } catch (e) {
      addNotification('Could not load the lobby. Please try again!(Websocket Error)');
    }
  };

  const handleNewGame = (topic) => {
    history.push(`/game/${topic}/${uuidv4()}`);
  };

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (socketState) {
      handleLobbyJoin();
    }
  }, [socketState]);

  if (!socketState || !gameList) {
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
      <NewGame onGameOpen={handleNewGame} topics={topicList} />
      {gameList.length === 0 && <NoAvailableGames />}
      {gameList && gameList.map((game) => <OpenGame key={game.id} game={game} />)}
    </>
  );
}
