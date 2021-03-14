import { func } from 'prop-types';
import styled from 'styled-components';
import { playerListType } from '../../types/types';
import Button from '../Buttons/Button';
import Icon from '../Icon/Icon';

export default function GameMaster({ onGameStart, playerList }) {
  return (
    <Container>
      {playerList.length === 1 && (
        <>
          <Headline>Where are your 🥷 friends?</Headline>
          <Icon fontsize="3rem" pulse>⌛</Icon>
        </>
      )}
      {playerList.length > 1 && (
        <>
          <Count>
            {playerList.length}
            {' '}
            🥷
          </Count>
          <Headline>have joined!</Headline>
          <Subtitle>Wait for more ninjas to join or start immediately...</Subtitle>
          <Icon pulse>
            <Button title="Lets fight!" fontsize="5rem" onClick={onGameStart}>⚔️</Button>
          </Icon>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  position:absolute;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-green-light-transparent);
  
  > * {
    align-self: center;
  }
`;

const Headline = styled.h1`
    font-size: 5rem;
    text-align:center;
    text-transform: uppercase;
    width: min-content;
    word-spacing: 10rem;
    margin: 0 0 15px;
`;

const Subtitle = styled.span`
  font-style: italic;
  margin-bottom: 5px;
`;

const Count = styled.h1`
  font-size: 5rem;  
  text-align:center;
  text-transform: uppercase;
  margin:0;
`;

GameMaster.propTypes = {
  onGameStart: func.isRequired,
  playerList: playerListType.isRequired,
};
