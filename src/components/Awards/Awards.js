import { onGameRestartType, playerType, resultsType } from '../../types/types';
import { Button, Container, Message } from './styles';

export default function Awards({ results, player, onGameRestart }) {
  const count = (
    <span>
      {player.points}
      {' '}
      /
      {' '}
      {results.maxPoints}
    </span>
  );

  const btn = (
    <Button onClick={() => onGameRestart()}>
      Again, again and again!
    </Button>
  );

  const message = (
    <>
      {results.position === 1 && (
      <Message>
        <span>🏅</span>
        {count}
        <span>Well done! Praise the master!</span>
        {btn}
      </Message>
      )}
      {results.position === 2 && (
      <Message>
        <span>🏅</span>
        {count}
        <span>Well done! You will do it next time!</span>
        {btn}
      </Message>
      )}
      {results.position === 3 && (
      <Message>
        <span>🏅</span>
        {count}
        <span>Well done! Close, very close!</span>
        {btn}
      </Message>
      )}
      {results.position > 3 && (
      <Message>
        <span>🤒</span>
        {count}
        <span>Well, trying is not enough...</span>
        {btn}
      </Message>
      )}
    </>
  );

  return (
    <Container position={results.position}>
      {message}
    </Container>
  );
}

Awards.propTypes = {
  results: resultsType.isRequired,
  player: playerType.isRequired,
  onGameRestart: onGameRestartType.isRequired,
};
