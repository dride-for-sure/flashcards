import { string } from 'prop-types';
import styled from 'styled-components';
import { playerListType } from '../../types/types';
import Icon from '../Icon/Icon';

export default function Waiting({ playerList, gameMasterName }) {
  return (
    <Container>
      <Count>
        {playerList.length}
        {' '}
        🥷
      </Count>
      <Headline>have joined!</Headline>
      <Subtitle>
        {gameMasterName}
        {' '}
        will start the game immediately! Stay tuned...
      </Subtitle>
      <Icon fontsize="3rem" pulse>⌛</Icon>
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
  margin-bottom: 40px;
`;

const Count = styled.h1`
  font-size: 5rem;  
  text-align:center;
  text-transform: uppercase;
  margin:0;
`;

Waiting.propTypes = {
  playerList: playerListType.isRequired,
  gameMasterName: string.isRequired,
};
