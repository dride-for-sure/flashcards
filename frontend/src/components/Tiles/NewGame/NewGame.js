import { func } from 'prop-types';
import { Container, Difficulty } from './styles';

export default function NewGame({ onGameOpen }) {
  return (
    <Container>
      <h1>Your own arena?</h1>
      <span>
        <Difficulty
          onClick={() => onGameOpen('EASY')}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          onClick={() => onGameOpen('MODERATE')}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          onClick={() => onGameOpen('HARD')}
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
