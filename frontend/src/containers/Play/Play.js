import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SockJsClient from 'react-stomp';
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
import { joinExistingGame, listInitialQuestionDtos, newGame, startGame } from '../../services/APIService';

export default function Play() {
  const [game, setGame] = useState();
  const [questionList, setQuestionList] = useState();
  const [socks, setSocks] = useState();
  const [socksConnected, setSocksConnected] = useState();
  const [playerDetails] = usePlayerDetails();
  const [addNotification] = useNotifications();
  const { gameId, difficulty } = useParams();
  const history = useHistory();

  const handleGameRestart = () => {
    history.push('/');
  };

  const handleDisconnect = () => {
    if (socksConnected) {
      socks.sendMessage(`/api/user/${game.id}`);
    }
  };

  const handleMessages = (data) => {
    if (data.type === 'QUESTIONLIST') {
      setQuestionList(data.questionDtoList);
    }
    if (data.type === 'GAME') {
      setGame(data);
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

  const handleGameStart = () => {
    startGame(game.id, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch(() => addNotification('Your ninja is need of sleep! Sorry. (Network Error)'));
  };

  const getInitialGame = () => {
    if (gameId) {
      joinExistingGame(gameId, { id: playerDetails.id, name: playerDetails.name })
        .then(setGame)
        .catch(() => addNotification('You love forbidden things, dont you? (Game not available)'));
    } else {
      newGame(difficulty, { id: playerDetails.id, name: playerDetails.name })
        .then(setGame)
        .catch(() => addNotification('Pow! Bang! Slapstick Action! But...not today!(Network Error)'));
    }
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
      {game && (
      <SockJsClient
        url="/ws"
        topics={[
          `/topic/game/${game.id}`,
          `/api/user/${game.id}`,
          `/topic/user/${game.id}/${playerDetails.id}`]}
        onConnect={() => {
          getInitialGame();
          getInitialQuestionList();
          setSocksConnected(true);
        }}
        onMessage={handleMessages}
        onDisconnect={() => setSocksConnected(false)}
        ref={setSocks}
        debug />
      )}
      <Logo />
      {game.status === 'FINISH'
      && (
      <Results
        playerList={game.playerList}
        playerDetails={playerDetails}
        onGameRestart={handleGameRestart} />
      )}
      {game && game.status === 'PREPARE'
        && game.master.id !== playerDetails.id
        && <Waiting gameMasterName={game.master.name} />}
      {game && game.status === 'PREPARE'
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
