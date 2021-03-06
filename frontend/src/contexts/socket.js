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
  const [playerDetails] = usePlayerDetails();

  const getInitialDataOnConnect = () => {
    listInitialQuestionDtos(game.id, playerDetails.id)
      .then((data) => setQuestionList(data))
      .catch(() => console.error('No data found'));
  };

  const handleMessages = (data) => {
    if (data.dtoType === 'QUESTIONLIST') {
      setQuestionList(data.questionDtoList);
    }
    if (data.dtoType === 'GAME') {
      setGame(data);
    }
  };

  return (
    <SocketContext.Provider value={[game, setGame, socks, questionList, setQuestionList]}>
      {game && (
      <SockJsClient
        url="/ws"
        topics={[
          `/topic/game/${game.id}`,
          `/api/user/${game.id}`,
          `/topic/user/${game.id}/${playerDetails.id}`]}
        onConnect={() => getInitialDataOnConnect()}
        onMessage={(data) => handleMessages(data)}
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
