import { func } from 'prop-types';
import getGameIconByDifficulty from '../../../common/handleIcons';
import Button from '../../Buttons/Button';
import Tiles from '../Tiles';
import Container from './styles';

export default function NewGame({ onGameOpen }) {
  return (
    <Tiles bg="var(--color-blue-medium)">
      <Container>
        <h1>To start a new game...</h1>
        <span>...choose a difficulty:</span>
        <span>
          <Button title="Easy peasy" onClick={() => onGameOpen('EASY')}>
            {getGameIconByDifficulty('EASY')}
          </Button>
          <Button title="Easy peasy" onClick={() => onGameOpen('MODERATE')}>
            {getGameIconByDifficulty('MODERATE')}
          </Button>
          <Button title="Easy peasy" onClick={() => onGameOpen('HARD')}>
            {getGameIconByDifficulty('HARD')}
          </Button>
        </span>
      </Container>
    </Tiles>
  );
}

NewGame.propTypes = {
  onGameOpen: func.isRequired,
};
