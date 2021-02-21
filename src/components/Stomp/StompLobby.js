import PropTypes from 'prop-types';
import SockJsClient from 'react-stomp';

export default function StompLobby({ gameStatus, setGameStatus }) {
  const SOCKET_URL = '/api';

  const onConnect = () => {

  };

  const onDisconnect = () => {

  };

  const onMessage = () => {

  };

  return (
    <SockJsClient
      url={SOCKET_URL}
      topics={['lobby']}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
      onMessage={onMessage}
      debug
    />
  );
}

StompLobby.propTypes = {
  gameStatus: PropTypes.shape({
    gameid: PropTypes.string,
    gamestatus: PropTypes.string,
    player: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  }).isRequired,
};
