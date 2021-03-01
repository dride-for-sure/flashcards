import { func } from 'prop-types';
import { Container, Difficulty } from './styles';

export default function NewGame({ onGameOpen }) {
  return (
    <Container>
      <h1>Your own arena?</h1>
      <span>
        <Difficulty
          onClick={() => onGameOpen('easy')}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          onClick={() => onGameOpen('moderat')}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          onClick={() => onGameOpen('hard')}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </Container>
  );
}

NewGame.propTypes = {
  onGameOpen: func.isRequired,
};
