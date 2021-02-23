import Awards from '../../components/Awards/Awards';
import FlashCard from '../../components/Cards/FlashCard/FlashCard';
import GameLogo from '../../components/Cards/GameLogo/GameLogo';
import GameTitle from '../../components/Cards/GameTitle/GameTitle';
import Charts from '../../components/Charts/Charts';
import { calcPlayerScoreColorType, calcPlayerScoreWidthType, gameType, onCardAnsweredType, onGameRestartType, playerType, resultsType } from '../../types/types';
import Container from './styles';

export default function Play(
  {
    game,
    results,
    player,
    onCardAnswered,
    calcPlayerScoreColor,
    calcPlayerScoreWidth,
    onGameRestart,
  },
) {
  return (
    <>
      <Awards
        results={results}
        player={player}
        onGameRestart={onGameRestart} />
      <Container>
        <GameLogo />
        <GameTitle />
        <FlashCard
          game={game}
          onCardAnswered={onCardAnswered} />
      </Container>
      <Charts
        game={game}
        calcPlayerScoreColor={calcPlayerScoreColor}
        calcPlayerScoreWidth={calcPlayerScoreWidth} />
    </>
  );
}

Play.propTypes = {
  game: gameType.isRequired,
  onCardAnswered: onCardAnsweredType.isRequired,
  calcPlayerScoreColor: calcPlayerScoreColorType.isRequired,
  calcPlayerScoreWidth: calcPlayerScoreWidthType.isRequired,
  results: resultsType.isRequired,
  player: playerType.isRequired,
  onGameRestart: onGameRestartType.isRequired,
};
