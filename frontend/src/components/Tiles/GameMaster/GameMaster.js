import { func } from 'prop-types';
import Icon from '../../Icon/Icon';
import Tiles from '../Tiles';
import StartButton from './styled';

export default function GameMaster({ onGameStart }) {
  return (
    <Tiles bg="var(--color-monochom-medium)" justify="center">
      <Icon pulse>
        <StartButton type="button" title="Lets fight!" onClick={() => onGameStart()}>⚔️</StartButton>
      </Icon>
    </Tiles>
  );
}

GameMaster.propTypes = {
  onGameStart: func.isRequired,
};
