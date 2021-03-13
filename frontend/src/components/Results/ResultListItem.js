import styled, { css } from 'styled-components/macro';
import { playerDetailsType, playerType } from '../../types/types';

export default function ResultListItem({ player, playerDetails }) {
  return (
    <Container itsMe={playerDetails.id === player.id} score={player.score}>
      <span>{player.name}</span>
    </Container>
  );
}

const Container = styled.li`
  font-size: 1.2rem;
  font-style: italic;
  text-transform: lowercase;
  
  ${(props) => props.itsMe && css`
    :after {
      content: '👈';
      margin-left: 5px;
    }
  `}
  
  :before {
    content: ${(props) => props.score};
    font-weight: 600;
    margin-right: 8px;
  }
`;

ResultListItem.propTypes = {
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
};
