import PropTypes from 'prop-types';
import Button from './styles';

export default function PlayControls(
  {
    gameMode,
    onPlayClick,
  },
) {
  const btn = () => {
    if (gameMode === 'play') {
      return 'Give up!';
    } if (gameMode === 'finish') {
      return 'Restart';
    } if (gameMode === 'prepared') {
      return 'Punch it!';
    }
    return 'Shuffle first!';
  };

  return (
    <Button
      disabled={gameMode !== 'ready' && gameMode !== 'play' && gameMode !== 'finish' && gameMode !== 'prepared'}
      gameMode={gameMode}
      onClick={() => { onPlayClick(); }}>
      {btn()}
    </Button>
  );
}

PlayControls.propTypes = {
  gameMode: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};
