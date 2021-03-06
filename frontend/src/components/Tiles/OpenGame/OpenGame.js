import { Link } from 'react-router-dom';
import getColorByDifficulty from '../../../common/handleDifficultyColor';
import getGameIconByDifficulty from '../../../common/handleIcons';
import { gamesListItemType } from '../../../types/types';
import Tiles from '../Tiles';
import Container from './styles';

export default function OpenGame({ game }) {
  return (
    <Tiles bg={getColorByDifficulty(game.difficulty)}>
      <Container>
        <span>{getGameIconByDifficulty(game.difficulty)}</span>
        <span>The GameMaster is:</span>
        <h1>{game.master.name}</h1>
        <Link to={`/game/${game.difficulty}/${game.id}`}>⚔️</Link>
      </Container>
    </Tiles>
  );
}

OpenGame.propTypes = {
  game: gamesListItemType.isRequired,
};
