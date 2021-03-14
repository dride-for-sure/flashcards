import { func } from 'prop-types';
import styled from 'styled-components/macro';
import { playerDetailsType, playerListType } from '../../types/types';
import ResultListItem from './ResultListItem';

export default function Results({ playerList, playerDetails, onRestart }) {
  const sortedPlayerList = playerList.sort(
    (playerA, playerB) => (playerB.score - playerA.score),
  );

  const headline = sortedPlayerList[0].id === playerDetails.id
    ? 'You have won!'
    : `${sortedPlayerList[0].name} has won!`;

  const symbol = sortedPlayerList[0].id === playerDetails.id
    ? '🏆'
    : '🤕';

  return (
    <Container>
      <Center>
        <span>{symbol}</span>
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
        <Button onClick={() => onRestart()}>
          Wanna try again?
        </Button>
      </Center>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  z-index:100;
  background-color: var(--color-green-light-transparent);
  overflow: scroll;
`;

const Center = styled.div`
  align-self:center;
  display:flex;
  flex-direction: column;
  width: 50%;
  max-width: 500px;
  padding-bottom:10%;

  > *{
    width: fit-content;
    align-self:center;
  }

  > span:first-of-type{
    font-size: 8rem;
    margin-bottom: 20px;
  }

  > h1 {
    font-size: 5rem;
    text-transform: uppercase;
    margin:0;
    padding: 0;
    text-align: center;
    width: min-content;
    word-spacing: 10rem;
  }
`;

const ResultList = styled.ol`
  margin: 35px 0 40px;
  padding: 0;
  list-style: none;

  > li+li {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  border: 0;
  border-radius:5px;
  padding: 8px;
  margin: 0;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  cursor: pointer;
  font-size: 1rem;
  padding: 12px;
  background-color: salmon;
`;

Results.propTypes = {
  playerList: playerListType.isRequired,
  playerDetails: playerDetailsType.isRequired,
  onRestart: func.isRequired,
};
