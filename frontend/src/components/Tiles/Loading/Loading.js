import Icon from '../../Icon/Icon';
import Tiles from '../Tiles';

export default function Loading() {
  return (
    <Tiles bg="var(--color-monochom-medium)" justify="center">
      <Icon pulse>🤺</Icon>
    </Tiles>
  );
}
