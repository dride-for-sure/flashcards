import PropTypes from 'prop-types';
import { Container, Difficulty } from './styles';

export default function NewGame({ onGameOpen }) {
  return (
    <Container>
      <h1>Fight your own game?</h1>
      <span>
        <Difficulty
          onClick={() => onGameOpen('easy')}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          onClick={() => onGameOpen('moderat')}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          onClick={() => onGameOpen('hard')}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </Container>
  );
}

NewGame.propTypes = {
  onGameOpen: PropTypes.func.isRequired,
};
