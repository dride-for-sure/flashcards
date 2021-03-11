import { func } from 'prop-types';
import { playerDetailsType, playerListType } from '../../types/types';
import ResultListItem from './ResultListItem/ResultListItem';
import { Button, Container, ResultList } from './styles';

export default function Results({ playerList, playerDetails, onGameRestart }) {
  const sortedPlayerList = playerList.sort(
    (playerA, playerB) => (playerB.score - playerA.score),
  );

  const headline = sortedPlayerList[0].id === playerDetails.id
    ? 'You have finished!'
    : `${sortedPlayerList[0].name} has finished!`;

  return (
    <Container>
      <div>
        <span>⛩️</span>
        <h1>{headline}</h1>
        <ResultList>
          {sortedPlayerList
            .map((player) => (
              <ResultListItem
                key={player.id}
                player={player}
                playerDetails={playerDetails} />
            ))}
        </ResultList>
        <Button onClick={() => onGameRestart()}>
          Wanna try again?
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
