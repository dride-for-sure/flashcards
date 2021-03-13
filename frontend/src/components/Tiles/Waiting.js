import { string } from 'prop-types';
import styled from 'styled-components/macro';
import Tiles from './Tiles';

export default function Waiting({ gameMasterName }) {
  return (
    <Tiles bg="var(--color-monochom-medium)">
      <Container>
        <h1>Ready?</h1>
        <span>
          <b>{gameMasterName}</b>
          {' '}
          will start this round immediately...maybe!
        </span>
      </Container>
    </Tiles>
  );
}

const Container = styled.div`
  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
  }

  > span {
    font-style: italic;
    flex-grow: 2;
  }
`;

Waiting.propTypes = {
  gameMasterName: string.isRequired,
};
