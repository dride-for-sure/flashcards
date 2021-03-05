import { Link } from 'react-router-dom';
import { gamesListItemType } from '../../../types/types';
import Container from './styles';

export default function OpenGame({ game }) {
  return (
    <Container background={game.difficulty}>
      <span>{game.icon}</span>
      <h1>{game.master.name}</h1>
      <Link to={`/game/${game.difficulty}/${game.id}`}>⚔️</Link>
    </Container>
  );
}

OpenGame.propTypes = {
  game: gamesListItemType.isRequired,
};
