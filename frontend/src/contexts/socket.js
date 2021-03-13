import { node } from 'prop-types';
import React, { useContext, useState } from 'react';
import SockJsClient from 'react-stomp';
import { usePlayerDetails } from './playerDetails';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [game, setGame] = useState();
  const [gameList, setGameList] = useState();
  const [questionList, setQuestionList] = useState();
  const [socket, setSocket] = useState();
  const [playerDetails] = usePlayerDetails();

  const handleMessages = (data) => {
    if (data.type === 'QUESTIONLIST') {
      setQuestionList(data.questionDtoList);
    }
    if (data.type === 'GAMELIST') {
      setGameList(data.gameDtoList);
    }
    if (data.type === 'GAME') {
      setGame(data);
    }
  };

  return (
    <SocketContext.Provider value={{ game, gameList, socket, questionList }}>
      <SockJsClient
        url="/ws"
        topics={[
          '/topic/games',
          '/api/games',
          playerDetails.id ? `/queue/player/${playerDetails.id}` : '',
        ]}
        onMessage={handleMessages}
        ref={setSocket}
        debug />
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;

SocketProvider.propTypes = {
  children: node.isRequired,
};
