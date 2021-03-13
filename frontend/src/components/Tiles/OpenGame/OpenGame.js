import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import getColorByDifficulty from '../../../common/handleDifficultyColor';
import getGameIconByDifficulty from '../../../common/handleIcons';
import { gamesListItemType } from '../../../types/types';
import Tiles from '../Tiles';

export default function OpenGame({ game }) {
  return (
    <Tiles bg={getColorByDifficulty(game.difficulty)}>
      <Container>
        <span>{getGameIconByDifficulty(game.difficulty)}</span>
        <span>The GameMaster is:</span>
        <h1>{game.master.name}</h1>
        <Link to={`/game/${game.difficulty}/${game.id}`}>⚔️</Link>
      </Container>
    </Tiles>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  > h1 {
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    word-break: break-word;
    flex-grow: 1;
  }

  > span {
    &:first-of-type {
      position:absolute;
      top:-18px;
      right:-13px;
      font-size: 3rem;
    }
    &:nth-of-type(2) {
      font-style: italic;
      margin-bottom: 3px;
    }
  }

  > a {
    font-size: 3.5rem;
    align-self:center;
    flex-grow: 1;
  }
`;

OpenGame.propTypes = {
  game: gamesListItemType.isRequired,
};
