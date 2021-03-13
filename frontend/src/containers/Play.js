import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import Results from '../components/Results/Results';
import ScoreList from '../components/Scores/ScoreList';
import ScoreListItem from '../components/Scores/ScoreListItem';
import GameMaster from '../components/Tiles/GameMaster';
import Loading from '../components/Tiles/Loading';
import Logo from '../components/Tiles/Logo';
import Question from '../components/Tiles/Question';
import Waiting from '../components/Tiles/Waiting';
import { useNotifications } from '../contexts/notifications';
import { usePlayerDetails } from '../contexts/playerDetails';
import { useSocket } from '../contexts/socket';

export default function Play() {
  const { handleReset, game, questionList, socket, socketState } = useSocket();
  const [playerDetails] = usePlayerDetails();
  const [addNotification] = useNotifications();
  const { gameId, topic } = useParams();
  const history = useHistory();

  const handleGameJoin = () => {
    handleReset();
    try {
      socket.sendMessage(`/api/games/${topic}/${gameId}/join`, JSON.stringify(playerDetails));
    } catch (e) {
      addNotification('The arena takes a break. Try again. I reloaded for you. Am I nice?');
      history.push('/');
    }
  };

  const handleGameStart = () => {
    try {
      socket.sendMessage(`/api/games/${topic}/${gameId}/start`);
    } catch (e) {
      addNotification('Your ninja is need of sleep! Sorry. (Network Error)');
    }
  };

  const handleAnswer = (id, selectedSolution) => {
    try {
      socket.sendMessage(`/api/player/${playerDetails.id}/${gameId}`, JSON.stringify({ id, selectedSolution }));
    } catch (e) {
      addNotification('Germany...internet...uknow? Try again in a few seconds! (Network Error)');
    }
  };

  const handleRestart = () => {
    history.push('/');
  };

  const handleUnmount = () => {
    try {
      socket.sendMessage(`/api/games/${topic}/${gameId}/leave`);
    } catch (e) {
      history.push('/');
      addNotification('Could not leave the current game. Please reload your browser manually! (Network Error)');
    }
    handleReset();
  };

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      addNotification('Please add a ninja name to start! Thanks.');
      history.push('/');
    }
    return (() => {
      handleUnmount();
    });
  }, []);

  useEffect(() => {
    if (socketState) {
      handleGameJoin();
    }
  }, [socketState]);

  if (!socketState || !game) {
    return (
      <>
        <Logo />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Logo />
      {game.status === 'FINISH'
        && (
        <Results
          playerList={game.playerList}
          playerDetails={playerDetails}
          onRestart={handleRestart} />
        )}
      {game
        && game.status === 'PREPARE'
        && game.master.id !== playerDetails.id
        && <Waiting gameMasterName={game.master.name} />}
      {game
        && game.status === 'PREPARE'
        && game.master.id === playerDetails.id
        && <GameMaster onGameStart={handleGameStart} />}
      {questionList && questionList.map((question) => (
        <Question
          key={question.id}
          question={question}
          onSendAnswer={handleAnswer} />
      ))}
      <ScoreList>
        {game && game.playerList.map((player) => (
          <ScoreListItem
            key={player.id}
            player={player}
            playerDetails={playerDetails}
            maxPoints={game.maxPoints} />
        ))}
      </ScoreList>
    </>
  );
}
