import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Grid from './components/Grid/Grid';
import Lobby from './containers/Lobby/Lobby';
import Play from './containers/Play/Play';
import Welcome from './containers/Welcome/Welcome';
import NotificationProvider from './contexts/notifications';
import PlayerNameProvider from './contexts/playerDetails';
import GlobalStyle from './GlobalStyles';

export default function App() {
  return (
    <Router>
      <PlayerNameProvider>
        <NotificationProvider>
          <GlobalStyle />
          <Grid>
            <Switch>
              <Route path="/game/:difficulty/:gameId?">
                <Play />
              </Route>
              <Route exact path="/games">
                <Lobby />
              </Route>
              <Route path="/">
                <Welcome />
              </Route>
            </Switch>
          </Grid>
        </NotificationProvider>
      </PlayerNameProvider>
    </Router>
  );
}
