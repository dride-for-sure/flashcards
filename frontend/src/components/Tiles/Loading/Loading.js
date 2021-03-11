import Icon from '../../Icon/Icon';
import Tiles from '../Tiles';

export default function Loading() {
  return (
    <Tiles bg="lightgrey" justify="center">
      <Icon pulse>🤺</Icon>
    </Tiles>
  );
}
