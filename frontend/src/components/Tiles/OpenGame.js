import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import getGameIconByTopic from '../../common/handleIcons';
import getColorByTopic from '../../common/handleTopicColor';
import { gamesListItemType } from '../../types/types';
import Tiles from './Tiles';

export default function OpenGame({ game }) {
  return (
    <Tiles bg={getColorByTopic(game.topic)}>
      <Topic>{getGameIconByTopic(game.topic)}</Topic>
      <SmallTitle>The GameMaster is:</SmallTitle>
      <h1>{game.master.name}</h1>
      <Center>
        <Link to={`/game/${game.topic}/${game.id}`}>⚔️</Link>
      </Center>
    </Tiles>
  );
}

const Topic = styled.div`
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
