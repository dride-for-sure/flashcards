import { string } from 'prop-types';
import styled from 'styled-components/macro';
import Tiles from './Tiles';

export default function Waiting({ gameMasterName }) {
  return (
    <Tiles bg="var(--color-monochrom-medium)">
      <h1>Ready?</h1>
      <Span>
        <b>{gameMasterName}</b>
        {' '}
        will start this round immediately...maybe!
      </Span>
    </Tiles>
  );
}

const Span = styled.div`
  font-style: italic;
  flex-grow: 2;
`;

Waiting.propTypes = {
  gameMasterName: string.isRequired,
};
