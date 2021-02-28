import { Link } from 'react-router-dom';
import { gameType } from '../../../types/types';
import Container from './styles';

export default function OpenGame({ game }) {
  return (
    <Container background={game.difficulty}>
      <span>
        {game.icon}
      </span>
      <h1>{game.gameMaster}</h1>
      <Link to={`/games/${game.difficulty}/${game.id}`}>⚔️</Link>
    </Container>
  );
}

OpenGame.propTypes = {
  game: gameType.isRequired,
};
