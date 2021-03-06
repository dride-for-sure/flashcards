import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import Tiles from '../Tiles';

export default function Logo() {
  return (
    <Tiles bg="tan" justify="center">
      <Icon>
        <Link to="/">⛩️</Link>
      </Icon>
    </Tiles>
  );
}
