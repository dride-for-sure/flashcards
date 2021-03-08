import { node } from 'prop-types';
import React, { useContext, useState } from 'react';
import SockJsClient from 'react-stomp';
import { listInitialQuestionDtos } from '../services/APIService';
import { usePlayerDetails } from './playerDetails';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [game, setGame] = useState();
  const [questionList, setQuestionList] = useState();
  const [socks, setSocks] = useState();
  const [socksConnected, setSocksConnected] = useState(false);
  const [playerDetails] = usePlayerDetails();

  const getInitialQuestionList = () => {
    listInitialQuestionDtos(game.id, playerDetails.id)
      .then(setQuestionList)
      .catch(() => console.error('No initial questionList found'));
  };

  const handleMessages = (data) => {
    if (data.type === 'QUESTIONLIST') {
      setQuestionList(data.questionDtoList);
    }
    if (data.type === 'GAME') {
      setGame(data);
    }
  };

  return (
    <SocketContext.Provider
      value={{ game, setGame, socks, questionList, setQuestionList, socksConnected }}>
      {game && (
      <SockJsClient
        url="/ws"
        topics={[
          `/topic/game/${game.id}`,
          `/api/user/${game.id}`,
          `/topic/user/${game.id}/${playerDetails.id}`]}
        onConnect={() => {
          getInitialQuestionList();
          setSocksConnected(true);
        }}
        onMessage={(data) => handleMessages(data)}
        onDisconnect={() => setSocksConnected(false)}
        ref={setSocks}
        debug />
      )}
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;

SocketProvider.propTypes = {
  children: node.isRequired,
};
