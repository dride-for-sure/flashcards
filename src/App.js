import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './containers/About/About';
import Game from './containers/Game/Game';
import Lobby from './containers/Lobby/Lobby';
import GlobalStyle from './GlobalStyles';

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/about/:slug?">
          <About />
        </Route>
        <Route path="/game/:id">
          <Game />
        </Route>
        <Route path="/">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}
