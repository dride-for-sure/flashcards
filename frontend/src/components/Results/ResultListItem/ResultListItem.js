import { number } from 'prop-types';
import { playerDetailsType, playerType } from '../../../types/types';
import { Container } from '../styles';

export default function ResultListItem({ position, player, playerDetails }) {
  const itsMe = playerDetails.id === player.id ? 'true' : 'false';

  return (
    <Container>
      <span itsMe={itsMe}>
        {position}
        .
      </span>
      <span>{player.name}</span>
      <span>{player.score}</span>
    </Container>
  );
}

ResultListItem.propTypes = {
  position: number.isRequired,
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
};
