import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import { validate as uuidValidate } from 'uuid';
import ScoreBar from '../../components/Charts/ScoreBar/ScoreBar';
import Charts from '../../components/Charts/styles';
import Results from '../../components/Results/Results';
import Loading from '../../components/Tiles/Loading/Loading';
import Logo from '../../components/Tiles/Logo/Logo';
import Question from '../../components/Tiles/Question/Question';
import Waiting from '../../components/Tiles/Waiting/Waiting';
import { usePlayerDetails } from '../../contexts/playerDetails';
import { joinExistingGame, listInitialQuestionDtos } from '../../services/APIService';

export default function Play() {
  const [game, setGame] = useState();
  const [questionList, setQuestionList] = useState();
  const [playerDetails] = usePlayerDetails();
  const [socks, setSocks] = useState();
  const [socksConnected, setSocksConnected] = useState(false);
  const { gameId } = useParams();
  const history = useHistory();

  const handleGameRestart = () => {
    history.push('/');
  };

  const handleAnswer = (id, selectedSolution) => {
    if (socksConnected) {
      socks.sendMessage(`/api/user/${gameId}/${playerDetails.id}`,
        JSON.stringify({ id, selectedSolution }));
    }
  };

  useEffect(() => {
    joinExistingGame(gameId, { id: playerDetails.id, name: playerDetails.name })
      .then(setGame)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (game && game.status === 'PLAY') {
      listInitialQuestionDtos(gameId, playerDetails.id)
        .then((data) => setQuestionList(data))
        .catch((error) => console.error(error));
    }
  }, [game]);

  if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
    history.push('/');
    return null;
  }

  if (!game) {
    return (
      <>
        <Logo />
        <Loading />
      </>
    );
  }

  return (
    <>
      <SockJsClient
        url="/ws"
        topics={[`/topic/game/${gameId}`]}
        onMessage={(data) => { setGame(data); }}
        debug />
      {game.status === 'PLAY' && (
      <SockJsClient
        url="/ws"
        topics={[`/topic/user/${gameId}/${playerDetails.id}`]}
        onConnect={() => setSocksConnected(true)}
        onMessage={(data) => { console.log(data); setQuestionList(data); }}
        onDisconnect={() => setSocksConnected(false)}
        ref={setSocks}
        debug />
      )}
      <Logo />
      {!socksConnected
      && <Loading />}
      {game.status === 'FINISH'
      && (
      <Results
        playerList={game.playerList}
        playerDetails={playerDetails}
        onGameRestart={handleGameRestart} />
      )}
      {game.status === 'PREPARE'
        && <Waiting gameMasterName={game.master.name} />}
      {questionList && socksConnected && questionList.map((question) => (
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
            playerDetails={playerDetails} />
        ))}
      </Charts>
    </>
  );
}
