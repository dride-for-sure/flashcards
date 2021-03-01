import { func } from 'prop-types';
import { Container, StartGame } from './styled';

export default function GameMaster({ onGameStart }) {
  return (
    <Container>
      <StartGame type="button" title="Lets fight!" onClick={() => onGameStart()}>⚔️</StartGame>
    </Container>
  );
}

GameMaster.propTypes = {
  onGameStart: func.isRequired,
};
