import PropTypes from 'prop-types';
import { Container, Difficulty } from './styles';

export default function StartGame({ gameMode, onStartGameClick }) {
  const disabled = gameMode !== 'lobby';

  return (
    <Container disabled={disabled} gameMode={gameMode}>
      <h1>To start choose a level</h1>
      <span>
        <Difficulty
          disabled={disabled}
          onClick={() => { onStartGameClick('easy'); }}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          disabled={disabled}
          onClick={() => { onStartGameClick('moderat'); }}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          disabled={disabled}
          onClick={() => { onStartGameClick('hard'); }}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </Container>
  );
}

StartGame.propTypes = {
  gameMode: PropTypes.string.isRequired,
  onStartGameClick: PropTypes.func.isRequired,
};
