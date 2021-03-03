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
import { usePlayerDetails } from '../../contexts/playerDetails';

export default function Game() {
  const [game, setGame] = useState();
  const [playerDetails] = usePlayerDetails();
  const [socks, setSocks] = useState();
  const { difficulty, gameId } = useParams();
  const history = useHistory();

  const handleGameRestart = () => {
    history.push('/');
  };

  const handleSendAnswer = (id, selected) => {
    try {
      const answer = JSON.stringify({
        id,
        selectedSolution: selected,
      });
      socks.sendMessage(`/api/games/${difficulty}/${gameId}/${playerDetails.id}`, answer);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGameStart = () => {
    try {
      socks.sendMessage(`/api/games/${difficulty}/${gameId}/${playerDetails.id}/start`, '');
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinGame = () => {
    try {
      const data = JSON.stringify({
        id: playerDetails.id,
        name: playerDetails.name,
        score: 0,
      });
      socks.sendMessage(`/api/games/${difficulty}/${gameId}`, data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('Hello');
    return function cleanup() {
      console.log('Bye bye');
    };
  }, []);

  if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
    history.push('/');
    return null;
  }

  if (!game) {
    return (
      <>
        <SockJsClient
          url="/ws"
          topics={[`/topic/games/${difficulty}/${gameId}`]}
          onConnect={() => handleJoinGame()}
          ref={(client) => setSocks(client)}
          onMessage={(data) => {
            console.log('SetGame: ', data);
            setGame(data);
          }} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <SockJsClient
        url="/ws"
        topics={[`/topic/games/${difficulty}/${gameId}/${playerDetails.id}`]}
        ref={(client) => setSocks(client)}
        onMessage={(data) => {
          console.log('SetGame: ', data);
          setGame(data);
        }} />
      {game.status === 'FINISH'
      && (
      <Results
        playerList={game.playerList}
        playerDetails={playerDetails}
        onGameRestart={handleGameRestart} />
      )}
      <Logo />
      {game.master.id === playerDetails.id
        && game.status === 'PREPARE'
        && <GameMaster onGameStart={handleGameStart} />}
      {game.master.id !== playerDetails.id
        && game.status === 'PREPARE'
        && <Waiting gameMasterName={game.master.name} />}
      {game.status === 'PLAY' && game.questionList.map((question) => (
        <Question
          key={question.id}
          question={question}
          onSendAnswer={handleSendAnswer} />
      ))}
      {game.status === 'PLAY' && (
      <Charts>
        {game.playerList.map((player) => (
          <ScoreBar
            key={player.id}
            maxPoints={game.maxPoints}
            player={player}
            playerDetails={playerDetails} />
        ))}
      </Charts>
      )}
    </>
  );
}
