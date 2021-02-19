import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Container from './styles';

export default function PlayerScore({ player, calcPlayerScoreColor, calcPlayerScoreWidth }) {
  const [barWidth, setBarWidth] = useState();
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    const colorTimer = calcPlayerScoreColor(player, setBarColor);
    const widthTimer = calcPlayerScoreWidth(player, setBarWidth);
    return () => {
      clearTimeout(widthTimer);
      clearTimeout(colorTimer);
    };
  }, []);

  return (
    <Container color={barColor} width={barWidth}>
      {player.name}
    </Container>
  );
}

PlayerScore.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    history: PropTypes.shape({
      won: PropTypes.number,
      lost: PropTypes.number,
    }),
  }).isRequired,
  calcPlayerScoreColor: PropTypes.func.isRequired,
  calcPlayerScoreWidth: PropTypes.func.isRequired,
};
