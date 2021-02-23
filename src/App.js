import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { handleAnswers } from './common/handleAnswers';
import { calcGameResults, handleGameRestart } from './common/handleAwards';
import { handlePlayerScoreColor, handlePlayerScoreWidth } from './common/handleCharts';
import handleGameStart from './common/handleGameStart';
import Messages from './components/Messages/Messages';
import Lobby from './containers/Lobby/Lobby';
import Play from './containers/Play/Play';
import GlobalStyle from './GlobalStyles';
import { joinGame, sendAnswer, startGame } from './services/gameAPI';

export default function Game() {
  const [player, setPlayer] = useState();
  const [gameId, setGameId] = useState();
  const [game, setGame] = useState();
  const [cards, setCards] = useState();
  const [countdown, setCountdown] = useState();
  const [started, setStarted] = useState();
  const [results, setResults] = useState();
  const history = useHistory();

  useEffect(() => {
    joinGame(player)
      .then((id) => setGameId(id));
  }, [player]);

  useEffect(() => {
    if (game.status === 'play' && !started) {
      handleGameStart(game, history, game, setCards, setCountdown);
      setStarted(true);
    }

    if (game.status === 'finish') {
      setResults(calcGameResults(game, player));
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
          <Route path="/play/:gameId">
            <Play
              game={game}
              player={player}
              results={results}
              onGameRestart={() => {
                handleGameRestart(setGame);
              }}
              onCardAnswered={(cardId, choosenAnswer) => {
                handleAnswers(cards, setCards, cardId, choosenAnswer, sendAnswer);
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
