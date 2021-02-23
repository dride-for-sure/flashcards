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
    players: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      points: PropTypes.number,
    })),
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      level: PropTypes.number,
      subject: PropTypes.string,
      question: PropTypes.string,
      choices: PropTypes.arrayOf(PropTypes.string),
    })),
  }).isRequired,
  onQuestionAnswered: PropTypes.func.isRequired,
  calcPlayerScoreColor: PropTypes.func.isRequired,
  calcPlayerScoreWidth: PropTypes.func.isRequired,
};
