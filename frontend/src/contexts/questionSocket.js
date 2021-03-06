import { node } from 'prop-types';
import React, { useContext, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useGameSocket } from './gameSocket';
import { usePlayerDetails } from './playerDetails';

const QuestionSocketContext = React.createContext();

const QuestionSocketProvider = ({ children }) => {
  const [questionList, setQuestionList] = useState();
  const [game] = useGameSocket();
  const [playerDetails] = usePlayerDetails();

  return (
    <QuestionSocketContext.Provider value={[questionList, setQuestionList]}>
      {game && game.status !== 'PREPARE' && (
      <SockJsClient
        url="/ws"
        topics={[`/topic/user/${game.id}/${playerDetails.id}`]}
        onMessage={(data) => setQuestionList(data)}
        debug />
      )}
      {children}
    </QuestionSocketContext.Provider>
  );
};

export const useQuestionSocket = () => useContext(QuestionSocketContext);

export default QuestionSocketProvider;

QuestionSocketProvider.propTypes = {
  children: node.isRequired,
};
