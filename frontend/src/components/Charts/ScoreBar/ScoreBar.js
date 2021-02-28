import { useEffect, useState } from 'react';
import { handlePlayerScoreColor, handlePlayerScoreWidth } from '../../../common/handleCharts';
import { playerNameType, playerType } from '../../../types/types';
import Container from './styles';

export default function ScoreBar({ player, playerDetails }) {
  const [barWidth, setBarWidth] = useState();
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    const colorTimer = handlePlayerScoreColor(player, setBarColor);
    const widthTimer = handlePlayerScoreWidth(player, setBarWidth);
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
  playerDetails: playerNameType.isRequired,
};
