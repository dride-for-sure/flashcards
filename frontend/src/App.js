import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/styles';
import Game from './containers/Game/Game';
import Lobby from './containers/Lobby/Lobby';
import Welcome from './containers/Welcome/Welcome';
import PlayerNameProvider from './contexts/playerDetails';
import GlobalStyle from './GlobalStyles';

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Main>
        <PlayerNameProvider>
          <Switch>
            <Route path="/games/:difficulty/:gameId">
              <Game />
            </Route>
            <Route path="/games">
              <Lobby />
            </Route>
            <Route exact path="/">
              <Welcome />
            </Route>
          </Switch>
        </PlayerNameProvider>
      </Main>
    </Router>
  );
}
