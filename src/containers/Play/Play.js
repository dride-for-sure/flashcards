import PropTypes from 'prop-types';
import GameLogo from '../../components/Cards/GameLogo/GameLogo';
import GameTitle from '../../components/Cards/GameTitle/GameTitle';
import Questions from '../../components/Cards/Questions/Questions';
import Charts from '../../components/Charts/Charts';
import Container from './styles';

export default function Play(
  {
    game,
    onQuestionAnswered,
    calcPlayerScoreColor,
    calcPlayerScoreWidth,
  },
) {
  return (
    <>
      <Container>
        <GameLogo />
        <GameTitle />
        <Questions
          game={game}
          onQuestionAnswered={onQuestionAnswered} />
      </Container>
      <Charts
        game={game}
        calcPlayerScoreColor={calcPlayerScoreColor}
        calcPlayerScoreWidth={calcPlayerScoreWidth} />
    </>
  );
}

Play.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    player: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      points: PropTypes.number,
    })),
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      level: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      answers: PropTypes.shape({
        a: PropTypes.string,
        b: PropTypes.string,
      }),
      status: PropTypes.string,
    })),
  }).isRequired,
  onQuestionAnswered: PropTypes.func.isRequired,
  calcPlayerScoreColor: PropTypes.func.isRequired,
  calcPlayerScoreWidth: PropTypes.func.isRequired,
};
