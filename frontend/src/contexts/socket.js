import { node } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useNotifications } from './notifications';
import { usePlayerDetails } from './playerDetails';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [game, setGame] = useState();
  const [gameList, setGameList] = useState();
  const [questionList, setQuestionList] = useState();
  const [socket, setSocket] = useState();
  const [socketState, setSocketState] = useState();
  const [playerDetails] = usePlayerDetails();
  const [addNotification] = useNotifications();

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

  const handleReset = () => {
    setGame();
    setQuestionList();
  };

  useEffect(() => {
    if (!socketState && socket) {
      addNotification('Connection to the arena lost. I\'m trying to reconnect (Websocket Error)');
    }
    if (socketState && socket) {
      addNotification('Connection to the arena established. Lets go!');
    }
  }, [socketState]);

  return (
    <SocketContext.Provider value={
      { handleReset, game, gameList, questionList, socket, socketState }
    }>
      <SockJsClient
        url="/ws"
        topics={[
          '/topic/games', // List<GameDto>
          playerDetails.id ? `/queue/player/${playerDetails.id}` : '', // List<QuestionDtoList> & GameDto
        ]}
        onConnect={() => setSocketState(true)}
        onMessage={handleMessages}
        onDisconnect={() => setSocketState(false)}
        ref={setSocket} />
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;

SocketProvider.propTypes = {
  children: node.isRequired,
};
