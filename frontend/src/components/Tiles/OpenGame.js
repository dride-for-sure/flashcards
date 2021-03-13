import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import getColorByDifficulty from '../../common/handleDifficultyColor';
import getGameIconByDifficulty from '../../common/handleIcons';
import { gamesListItemType } from '../../types/types';
import Tiles from './Tiles';

export default function OpenGame({ game }) {
  return (
    <Tiles bg={getColorByDifficulty(game.difficulty)}>
      <Difficulty>{getGameIconByDifficulty(game.difficulty)}</Difficulty>
      <SmallTitle>The GameMaster is:</SmallTitle>
      <h1>{game.master.name}</h1>
      <Center>
        <Link to={`/game/${game.difficulty}/${game.id}`}>⚔️</Link>
      </Center>
    </Tiles>
  );
}

const Difficulty = styled.div`
  position:absolute;
  top:-18px;
  right:-13px;
  font-size: 3rem;
`;

const SmallTitle = styled.span`
  font-style: italic;
  margin-bottom: 3px;  
`;

const Center = styled.span`
  font-size: 3.5rem;
  align-self:center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;

`;

OpenGame.propTypes = {
  game: gamesListItemType.isRequired,
};
