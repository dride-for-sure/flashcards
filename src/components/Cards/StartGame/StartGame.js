import PropTypes from 'prop-types';
import { Container, Difficulty } from './styles';

export default function StartGame({ onStartGameClick }) {
  return (
    <Container>
      <h1>To start choose a level</h1>
      <span>
        <Difficulty
          onClick={() => { onStartGameClick('easy'); }}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          onClick={() => { onStartGameClick('moderat'); }}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          onClick={() => { onStartGameClick('hard'); }}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </Container>
  );
}

StartGame.propTypes = {
  onStartGameClick: PropTypes.func.isRequired,
};
