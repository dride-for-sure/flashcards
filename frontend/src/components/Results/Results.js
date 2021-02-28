import PropTypes from 'prop-types';
import { playerType, resultsType } from '../../types/types';
import ResultListItem from './ResultListItem/ResultListItem';
import { Button, Container, ResultList } from './styles';

export default function Results({ results, playerDetails, onGameRestart }) {
  return (
    <Container position={results.position}>
      <span>⛩️</span>
      <h1>Well...</h1>
      <ResultList>
        {results.map((player, index) => (
          <ResultListItem
            key={player.id}
            position={index + 1}
            player={player}
            playerDetails={playerDetails} />
        ))}
      </ResultList>
      <Button onClick={() => onGameRestart()}>
        Again, again and again!
      </Button>
    </Container>
  );
}

Results.propTypes = {
  results: resultsType.isRequired,
  playerDetails: playerType.isRequired,
  onGameRestart: PropTypes.func.isRequired,
};
