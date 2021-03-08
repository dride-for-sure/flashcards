import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import ScoreBar from '../../components/Charts/ScoreBar/ScoreBar';
import Charts from '../../components/Charts/styles';
import Results from '../../components/Results/Results';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import Question from '../../components/Tiles/Question/Question';
import Waiting from '../../components/Tiles/Waiting/Waiting';
import { useNotifications } from '../../contexts/notifications';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { useSocket } from '../../contexts/socket';
import { joinExistingGame, listInitialQuestionDtos } from '../../services/APIService';

export default function Play() {
  const { game, setGame, socks, questionList, setQuestionList, socksConnected } = useSocket();
  const [playerDetails] = usePlayerDetails();
  const [addNotification] = useNotifications();
  const { gameId } = useParams();
  const history = useHistory();

  const handleGameRestart = () => {
    history.push('/');
  };

  const handleDisconnect = () => {
    if (socksConnected) {
      socks.sendMessage(`/api/user/${game.id}`);
    }
  };

  const handleAnswer = (id, selectedSolution) => {
    if (socksConnected) {
      socks.sendMessage(`/api/user/${gameId}/${playerDetails.id}`,
        JSON.stringify({ id, selectedSolution }));
    } else {
      addNotification('Stay calm little ninja. the internet in germany is not that fast. try again in a few seconds! (Database Error)');
    }
  };

  const getInitialGame = () => {
    joinExistingGame(gameId, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch(() => addNotification('You love forbidden things, dont you? (Game not available)'));
  };

  const getInitialQuestionList = () => {
    listInitialQuestionDtos(gameId, playerDetails.id)
      .then((data) => setQuestionList(data))
      .catch(() => addNotification('MongoDb is taking a nap! Again! (Database Error)'));
  };

  useEffect(() => {
    if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
      history.push('/');
    }
    getInitialGame();
    return (() => {
      handleDisconnect();
    });
  }, []);

  useEffect(() => {
    if (game && game.status === 'PLAY') {
      getInitialQuestionList();
    }
  }, [game]);

  if (!game || !socks) {
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
        onGameRestart={handleGameRestart} />
      )}
      {game.status === 'PREPARE'
        && <Waiting gameMasterName={game.master.name} />}
      {questionList && questionList.map((question) => (
        <Question
          key={question.id}
          question={question}
          onSendAnswer={handleAnswer} />
      ))}
      <Charts>
        {game.playerList.map((player) => (
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
