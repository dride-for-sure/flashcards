import { bool, number } from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { addScoreWidthRandomness, handleScoreColor, handleScoreWidth } from '../../common/handleCharts';
import { playerDetailsType, playerType } from '../../types/types';

export default function ScoreListItem({ player, playerDetails, maxPoints, showPlayer }) {
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
    const width = (100 / (maxPoints / player.score)) + barRandomness + (showPlayer ? 15 : 0);
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

const Container = styled.div`
  align-self: flex-end;
  font-size: .8rem;
  text-transform: uppercase;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  opacity: .7;
  white-space: nowrap;
  overflow: hidden;
  transition: width 3s ease-in-out;
  box-sizing: border-box;

  > div {
    padding: 3px 15px;
  }
`;

ScoreListItem.propTypes = {
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
  maxPoints: number.isRequired,
  showPlayer: bool.isRequired,
};
