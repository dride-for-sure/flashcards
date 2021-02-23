import PropTypes from 'prop-types';
import SockJsClient from 'react-stomp';

export default function Messages({ gameId, setGame }) {
  const SOCKET_URL = '/api';

  const topics = `/games/${gameId}`;

  const onConnect = () => {
    console.log('WS: Connected');
  };

  const onDisconnect = () => {
    console.log('WS: Disconnected');
  };

  const onMessage = (updates) => {
    console.log('WS: Updates received', updates);
    setGame(updates);
  };

  return (
    <SockJsClient
      url={SOCKET_URL}
      topics={topics}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
      onMessage={(msg) => onMessage(msg)}
      debug
    />
  );
}

Messages.propTypes = {
  gameId: PropTypes.string.isRequired,
  setGame: PropTypes.func.isRequired,
};
