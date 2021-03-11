import { playerDetailsType, playerType } from '../../../types/types';
import Container from './styled';

export default function ResultListItem({ player, playerDetails }) {
  return (
    <Container itsMe={playerDetails.id === player.id} score={player.score}>
      <span>{player.name}</span>
    </Container>
  );
}

ResultListItem.propTypes = {
  player: playerType.isRequired,
  playerDetails: playerDetailsType.isRequired,
};
