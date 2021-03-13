import { func } from 'prop-types';
import styled from 'styled-components';
import getGameIconByDifficulty from '../../common/handleIcons';
import Button from '../Buttons/Button';
import Tiles from './Tiles';

export default function NewGame({ onGameOpen }) {
  return (
    <Tiles bg="var(--color-blue-medium)">
      <h1>To start a new game...</h1>
      <Subtitle>...choose a difficulty:</Subtitle>
      <Container>
        <Button title="Easy peasy" fontsize="2rem" onClick={() => onGameOpen('EASY')}>
          {getGameIconByDifficulty('EASY')}
        </Button>
        <Button title="Easy peasy" fontsize="2rem" onClick={() => onGameOpen('MODERATE')}>
          {getGameIconByDifficulty('MODERATE')}
        </Button>
        <Button title="Easy peasy" fontsize="2rem" onClick={() => onGameOpen('HARD')}>
          {getGameIconByDifficulty('HARD')}
        </Button>
      </Container>
    </Tiles>
  );
}

const Subtitle = styled.div`
  margin-top: 10px;
  font-style: italic;
  display:block;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;

  > button + button {
    margin-left: 7%;
  }
`;

NewGame.propTypes = {
  onGameOpen: func.isRequired,
};
