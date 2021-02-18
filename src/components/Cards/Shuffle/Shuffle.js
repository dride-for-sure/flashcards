import PropTypes from 'prop-types';
import { Container, Difficulty } from './styles';

export default function Shuffle({ gameMode, onShuffleClick }) {
  const disabled = gameMode !== 'empty' && gameMode !== 'ready' && gameMode !== 'prepared';

  return (
    <Container disabled={disabled} gameMode={gameMode}>
      <h1>Shuffle that deck</h1>
      <span>
        <Difficulty
          disabled={disabled}
          onClick={() => { onShuffleClick('easy'); }}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          disabled={disabled}
          onClick={() => { onShuffleClick('moderat'); }}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          disabled={disabled}
          onClick={() => { onShuffleClick('hard'); }}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </Container>
  );
}

Shuffle.propTypes = {
  gameMode: PropTypes.string.isRequired,
  onShuffleClick: PropTypes.func.isRequired,
};
