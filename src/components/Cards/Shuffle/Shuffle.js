import PropTypes from 'prop-types';
import { Difficulty, ShuffleCard } from './styles';

export default function Shuffle({ gameMode, onShuffleClick }) {
  const disabled = gameMode !== 'empty' && gameMode !== 'ready' && gameMode !== 'prepared';

  return (
    <ShuffleCard disabled={disabled} gameMode={gameMode}>
      <span>Shuffle that deck</span>
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
    </ShuffleCard>
  );
}

Shuffle.propTypes = {
  gameMode: PropTypes.string.isRequired,
  onShuffleClick: PropTypes.func.isRequired,
};
