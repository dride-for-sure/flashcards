import { func } from 'prop-types';
import styled from 'styled-components/macro';
import Icon from '../../Icon/Icon';
import Tiles from '../Tiles';

export default function GameMaster({ onGameStart }) {
  return (
    <Tiles bg="var(--color-monochom-medium)" justify="center">
      <Icon pulse>
        <StartButton type="button" title="Lets fight!" onClick={() => onGameStart()}>⚔️</StartButton>
      </Icon>
    </Tiles>
  );
}

const StartButton = styled.button`
  border:0;
  background-color: transparent;
  font-size: 7rem;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

GameMaster.propTypes = {
  onGameStart: func.isRequired,
};
