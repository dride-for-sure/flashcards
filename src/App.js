import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './containers/Game/Game';
import GlobalStyle from './GlobalStyles';

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/:id?">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}
