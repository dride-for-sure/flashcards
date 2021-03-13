import { func } from 'prop-types';
import Button from '../Buttons/Button';
import Icon from '../Icon/Icon';
import Tiles from './Tiles';

export default function GameMaster({ onGameStart }) {
  return (
    <Tiles bg="var(--color-monochrom-medium)" justify="center">
      <Icon pulse>
        <Button type="button" title="Lets fight!" fontsize="7rem" onClick={() => onGameStart()}>⚔️</Button>
      </Icon>
    </Tiles>
  );
}

GameMaster.propTypes = {
  onGameStart: func.isRequired,
};
