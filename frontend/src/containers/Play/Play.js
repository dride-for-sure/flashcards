import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import ScoreBar from '../../components/Charts/ScoreBar/ScoreBar';
import Charts from '../../components/Charts/styles';
import Results from '../../components/Results/Results';
import GameMaster from '../../components/Tiles/GameMaster/GameMaster';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import Question from '../../components/Tiles/Question/Question';
import Waiting from '../../components/Tiles/Waiting/Waiting';
import { useNotifications } from '../../contexts/notifications';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { useSocket } from '../../contexts/socket';

export default function Play() {
  const { handleReset, game, questionList, socket, socketState } = useSocket();
  const [playerDetails] = usePlayerDetails();
  const [addNotification] = useNotifications();
  const { gameId, difficulty } = useParams();
  const history = useHistory();

  const handleGameJoin = () => {
    handleReset();
    try {
      socket.sendMessage(`/api/games/${difficulty}/${gameId}/join`, JSON.stringify(playerDetails));
    } catch (e) {
      addNotification('The arena takes a break. Try again. I reloaded for you. Am I nice?');
      history.push('/');
    }
  };

  const handleGameStart = () => {
    try {
      socket.sendMessage(`/api/games/${difficulty}/${gameId}/start`);
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
      socket.sendMessage(`/api/games/${difficulty}/${gameId}/leave`);
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
      <Charts>
        {game && game.playerList.map((player) => (
          <ScoreBar
            key={player.id}
            player={player}
            playerDetails={playerDetails}
            maxPoints={game.maxPoints} />
        ))}
      </Charts>
    </>
  );
}
