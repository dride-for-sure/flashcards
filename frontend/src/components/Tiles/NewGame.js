import { func } from 'prop-types';
import styled from 'styled-components/macro';
import getGameIconByDifficulty from '../../common/handleIcons';
import Button from '../Buttons/Button';
import Tiles from './Tiles';

export default function NewGame({ onGameOpen }) {
  return (
    <Tiles bg="var(--color-blue-medium)">
      <Container>
        <h1>To start a new game...</h1>
        <span>...choose a difficulty:</span>
        <span>
          <Button title="Easy peasy" onClick={() => onGameOpen('EASY')}>
            {getGameIconByDifficulty('EASY')}
          </Button>
          <Button title="Easy peasy" onClick={() => onGameOpen('MODERATE')}>
            {getGameIconByDifficulty('MODERATE')}
          </Button>
          <Button title="Easy peasy" onClick={() => onGameOpen('HARD')}>
            {getGameIconByDifficulty('HARD')}
          </Button>
        </span>
      </Container>
    </Tiles>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
  }

  > span:first-of-type {
    margin-top: 10px;
    font-style: italic;
    display:block;
  }

  > span:nth-of-type(2){
    display: flex;
    flex-direction: row;
    margin-top: 5px;

    > button + button {
      margin-left: 7%;
    }
     
    > button {
    border:0;
    background-color: transparent;
    font-size: 2rem;
    outline: none;
    }
  }
`;

NewGame.propTypes = {
  onGameOpen: func.isRequired,
};
