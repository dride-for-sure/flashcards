import { useEffect, useState } from 'react';
import { handlePlayerScoreColor, handlePlayerScoreWidth } from '../../../common/handleCharts';
import { playerDetailsType, playerType } from '../../../types/types';
import Container from './styles';

export default function ScoreBar({ player, playerDetails }) {
  const [barWidth, setBarWidth] = useState();
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    const colorTimer = handlePlayerScoreColor(player, 0, setBarColor);
    const widthTimer = handlePlayerScoreWidth(player, 0, setBarWidth); // FIX 0

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
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
};
