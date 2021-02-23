import { useEffect, useState } from 'react';
import { calcPlayerScoreColorType, calcPlayerScoreWidthType, playerType } from '../../../types/types';
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
  player: playerType.isRequired,
  calcPlayerScoreColor: calcPlayerScoreColorType.isRequired,
  calcPlayerScoreWidth: calcPlayerScoreWidthType.isRequired,
};
