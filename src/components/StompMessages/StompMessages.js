import PropTypes from 'prop-types';
import SockJsClient from 'react-stomp';

export default function StompMessages({ gameStatus, setGameStatus }) {
  const SOCKET_URL = '/api';

  const topics = `/games/${gameStatus.id}/${gameStatus.player.id}`;

  const onConnect = () => {
    console.log('Lobby: Connected');
  };

  const onDisconnect = () => {
    console.log('Lobby: Disconnected');
  };

  const onMessage = (msg) => {
    console.log('Lobby: Message received', msg);
    setGameStatus(msg);
  };

  return (
    <SockJsClient
      url={SOCKET_URL}
      topics={topics}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
      onMessage={(msg) => onMessage(msg)}
      debug // TESTED?
    />
  );
}

StompMessages.propTypes = {
  gameStatus: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    player: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  }).isRequired,
  setGameStatus: PropTypes.func.isRequired,
};
