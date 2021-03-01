import { func } from 'prop-types';
import { playerDetailsType, playerListType } from '../../types/types';
import ResultListItem from './ResultListItem/ResultListItem';
import { Button, Container, ResultList } from './styles';

export default function Results({ playerList, playerDetails, onGameRestart }) {
  return (
    <Container>
      <span>⛩️</span>
      <h1>Well...</h1>
      <ResultList>
        {playerList
          .sort((playerA, playerB) => (
            playerA.score - playerB.score))
          .map((player, index) => (
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
  playerList: playerListType.isRequired,
  playerDetails: playerDetailsType.isRequired,
  onGameRestart: func.isRequired,
};
