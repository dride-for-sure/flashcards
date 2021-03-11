import { node } from 'prop-types';
import React, { useContext, useState } from 'react';
import SockJsClient from 'react-stomp';
import { listAvailableGames } from '../services/APIService';
import { usePlayerDetails } from './playerDetails';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [game, setGame] = useState();
  const [gameList, setGameList] = useState();
  const [questionList, setQuestionList] = useState();
  const [socket, setSocket] = useState();
  const [playerDetails] = usePlayerDetails();
  const [joinedGameId, setJoinedGameId] = useState();

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

  const getAvailableGamesOnConnect = () => {
    listAvailableGames()
      .then(handleMessages)
      .catch(() => console.error('No data found'));
  };

  return (
    <SocketContext.Provider value={{
      game,
      setGame,
      setJoinedGameId,
      gameList,
      setGameList,
      socket,
      questionList,
      setQuestionList }}>
      {game && (
      <SockJsClient
        url="/ws"
        topics={[
          '/topic/games',
          joinedGameId ? `/topic/game/${joinedGameId}` : '',
          joinedGameId ? `/api/user/${joinedGameId}` : '',
          joinedGameId ? `/topic/user/${joinedGameId}/${playerDetails.id}` : '',
        ]}
        onConnect={getAvailableGamesOnConnect}
        onMessage={handleMessages}
        ref={setSocket}
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
