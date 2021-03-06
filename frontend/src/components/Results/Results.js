import { func } from 'prop-types';
import { playerDetailsType, playerListType } from '../../types/types';
import ResultListItem from './ResultListItem/ResultListItem';
import { Button, Container, ResultList } from './styles';

export default function Results({ playerList, playerDetails, onGameRestart }) {
  return (
    <Container>
      <div>
        <span>⛩️</span>
        <h1>Well...</h1>
        <ResultList>
          {playerList
            .sort((playerA, playerB) => (
              playerB.score - playerA.score))
            .map((player) => (
              <ResultListItem
                key={player.id}
                player={player}
                playerDetails={playerDetails} />
            ))}
        </ResultList>
        <Button onClick={() => onGameRestart()}>
          Again, again and again!
        </Button>
      </div>
    </Container>
  );
}

Results.propTypes = {
  playerList: playerListType.isRequired,
  playerDetails: playerDetailsType.isRequired,
  onGameRestart: func.isRequired,
};
