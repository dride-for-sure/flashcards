import { number } from 'prop-types';
import { useEffect, useState } from 'react';
import { addScoreWidthRandomness, handleScoreColor, handleScoreWidth } from '../../../common/handleCharts';
import { playerDetailsType, playerType } from '../../../types/types';
import Container from './styles';

export default function ScoreBar({ player, playerDetails, maxPoints }) {
  const [barWidth, setBarWidth] = useState();
  const [barRandomness, setBarRandomness] = useState();
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    const widthTimer = addScoreWidthRandomness(setBarRandomness);
    return () => {
      clearTimeout(widthTimer);
    };
  }, []);

  useEffect(() => {
    const width = (100 / (maxPoints / player.score)) + barRandomness;
    handleScoreWidth(width, setBarWidth);
    handleScoreColor(player.score, maxPoints, setBarColor);
  }, [barRandomness]);

  return (
    <Container color={barColor} width={`${barWidth}%`}>
      <div>
        {playerDetails.id === player.id && <span>👉</span>}
        {player.name}
      </div>
    </Container>
  );
}

ScoreBar.propTypes = {
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
  maxPoints: number.isRequired,
};
