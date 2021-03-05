import { node } from 'prop-types';
import React, { useContext, useState } from 'react';
import SockJsClient from 'react-stomp';

const GameSocketContext = React.createContext();

const GameSocketProvider = ({ children }) => {
  const [game, setGame] = useState();
  const [socks, setSocks] = useState();

  return (
    <GameSocketContext.Provider value={[game, setGame, socks]}>
      {game && (
      <SockJsClient
        url="/ws"
        topics={[`/topic/game/${game.id}`, `/api/user/${game.id}`]}
        onMessage={(data) => { setGame(data); }}
        ref={setSocks}
        debug />
      )}
      {children}
    </GameSocketContext.Provider>
  );
};

export const useGameSocket = () => useContext(GameSocketContext);

export default GameSocketProvider;

GameSocketProvider.propTypes = {
  children: node.isRequired,
};
