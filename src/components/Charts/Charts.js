import { calcPlayerScoreColorType, calcPlayerScoreWidthType, gameType } from '../../types/types';
import PlayerScore from './PlayerScore/PlayerScore';
import Container from './styles';

export default function Charts({ game, calcPlayerScoreColor, calcPlayerScoreWidth }) {
  return (
    <Container>
      {game.player.map((player) => (
        <PlayerScore
          key={player.id}
          player={player}
          calcPlayerScoreColor={calcPlayerScoreColor}
          calcPlayerScoreWidth={calcPlayerScoreWidth}
        />
      ))}
    </Container>
  );
}

Charts.propTypes = {
  game: gameType.isRequired,
  calcPlayerScoreColor: calcPlayerScoreColorType.isRequired,
  calcPlayerScoreWidth: calcPlayerScoreWidthType.isRequired,
};
