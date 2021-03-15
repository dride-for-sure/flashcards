import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import getGameIconByTopic from '../../common/handleIcons';
import getColorByTopic from '../../common/handleTopicColor';
import { gamesListItemType } from '../../types/types';
import Tiles from './Tiles';

export default function OpenGame({ game }) {
  return (
    <Tiles bg={getColorByTopic(game.topic)}>
      <Icon>{getGameIconByTopic(game.topic)}</Icon>
      <h1>{game.topic}</h1>
      <Stats>
        <StatItem>
          <span>👩‍👩‍👧‍👦 x</span>
          <span>{game.playerList.length}</span>
        </StatItem>
        <StatItem>
          <span>🥷</span>
          <span>{game.master.name}</span>
        </StatItem>
      </Stats>
      <CTA>
        Do you dare to compete?
        {' '}
        <b>Click to start:</b>
      </CTA>
      <Center>
        <Link to={`/game/${game.topic}/${game.id}`}>⚔️</Link>
      </Center>
    </Tiles>
  );
}

const Icon = styled.div`
  position:absolute;
  top:-15px;
  right:-13px;
  font-size: 3rem;
`;

const Stats = styled.div`
  display:flex;
  flex-direction: row;
  margin: 8px 0;

  > span + span {
    margin-left: 14px;
  }
`;

const StatItem = styled.span`
  align-self: center;

  > span:first-of-type {
    margin-right: 2px;
    font-size: 1.3rem;
  }

  > span:last-of-type {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const CTA = styled.span`
  flex-grow: 1;
  font-style: italic;
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
