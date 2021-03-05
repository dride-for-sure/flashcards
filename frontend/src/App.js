import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/styles';
import Lobby from './containers/Lobby/Lobby';
import NewGame from './containers/NewGame/NewGame';
import Play from './containers/Play/Play';
import Welcome from './containers/Welcome/Welcome';
import GameSocketProvider from './contexts/gameSocket';
import PlayerNameProvider from './contexts/playerDetails';
import QuestionSocketProvider from './contexts/questionSocket';
import GlobalStyle from './GlobalStyles';

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Main>
        <PlayerNameProvider>
          <GameSocketProvider>
            <QuestionSocketProvider>
              <Switch>
                <Route exact path="/game/:difficulty/:gameId">
                  <Play />
                </Route>
                <Route exact path="/game/:difficulty">
                  <NewGame />
                </Route>
                <Route exact path="/games">
                  <Lobby />
                </Route>
                <Route path="/">
                  <Welcome />
                </Route>
              </Switch>
            </QuestionSocketProvider>
          </GameSocketProvider>
        </PlayerNameProvider>
      </Main>
    </Router>
  );
}
