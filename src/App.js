import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { handleAwards } from './common/handleAwards';
import { handlePlayerScoreColor, handlePlayerScoreWidth } from './common/handleCharts';
import handleGameStart from './common/handleGameStart';
import { handleQuestions } from './common/handleQuestions';
import Awards from './components/Awards/Awards';
import Messages from './components/Messages/Messages';
import Lobby from './containers/Lobby/Lobby';
import Play from './containers/Play/Play';
import GlobalStyle from './GlobalStyles';
import { joinGame, startGame } from './services/gameAPI';

export default function Game() {
  const [player, setPlayer] = useState();
  const [gameId, setGameId] = useState();
  const [game, setGame] = useState();
  const [cards, setCards] = useState();
  const [countdown, setCountdown] = useState();
  const history = useHistory();

  useEffect(() => {
    joinGame(player)
      .then((id) => setGameId(id));
  }, [player]);

  useEffect(() => {
    if (game.status === 'play' && countdown === '') {
      handleGameStart(game, history, cards, setCards, setCountdown);
    }
  }, [game]);

  return (
    <>
      <GlobalStyle />
      <Router>
        {gameId && (
          <Messages
            gameId={gameId}
            setGame={(updates) => {
              setGame(updates);
            }}
          />
        )}
        <Switch>
          <Route path="/result/:gameId">
            <Awards
              game={game}
              onGameRestart={() => {
                handleAwards(setGame);
              }}
            />
          </Route>
          <Route path="/play/:gameId">
            <Play
              game={game}
              onQuestionAnswered={(returnedGame) => {
                handleQuestions(returnedGame, setGame);
              }}
              calcPlayerScoreColor={(selectedPlayer, setBarColor) => {
                handlePlayerScoreColor(selectedPlayer, game, setBarColor);
              }}
              calcPlayerScoreWidth={(selectedPlayer, setBarWidth) => {
                handlePlayerScoreWidth(selectedPlayer, game, setBarWidth);
              }}
            />
          </Route>
          <Route path="/">
            <Lobby
              game={game}
              player={player}
              setPlayer={(details) => {
                setPlayer(details);
              }}
              countdown={countdown}
              onGameStart={(level) => {
                startGame(player, game, level);
              }}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
