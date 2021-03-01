import { number } from 'prop-types';
import { useEffect, useState } from 'react';
import { handlePlayerScoreColor, handlePlayerScoreWidth } from '../../../common/handleCharts';
import { playerDetailsType, playerType } from '../../../types/types';
import Container from './styles';

export default function ScoreBar({ maxPoints, player, playerDetails }) {
  const [barWidth, setBarWidth] = useState();
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    const colorTimer = handlePlayerScoreColor(player, maxPoints, setBarColor);
    const widthTimer = handlePlayerScoreWidth(player, maxPoints, setBarWidth);

    return () => {
      clearTimeout(widthTimer);
      clearTimeout(colorTimer);
    };
  }, []);

  return (
    <Container color={barColor} width={barWidth}>
      {playerDetails.id === player.id && <span>👉</span>}
      {player.name}
    </Container>
  );
}

ScoreBar.propTypes = {
  maxPoints: number.isRequired,
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
};
