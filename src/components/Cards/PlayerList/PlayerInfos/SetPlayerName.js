import PropTypes from 'prop-types';
import { useState } from 'react';
import uuid from '../../../../common/uuid';
import Player from '../Player/Player';
import { Container, Input } from './styles';

export default function SetPlayerName({ thisPlayer, setThisPlayer }) {
  const [playerName, setPlayerName] = useState('');
  const headline = 'Your ninja name?';
  const inputPlaceholder = 'It has one, right?';

  const hasThisPlayer = thisPlayer && Object.keys(thisPlayer).length === 0;
  const hasPlayerName = playerName.length > 0 && playerName.length < 25;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasPlayerName) {
      setThisPlayer({ id: uuid(), name: playerName });
      setPlayerName('');
    }
  };

  return (
    <>
      { hasThisPlayer && (
      <Container>
        <h1>{headline}</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Input type="text" placeholder={inputPlaceholder} validate={(hasPlayerName).toString()} value={playerName} onChange={(event) => setPlayerName(event.target.value)} />
        </form>
      </Container>
      )}
      { !hasThisPlayer && (
      <Player key={thisPlayer.id} player={thisPlayer} />
      )}
    </>
  );
}

SetPlayerName.propTypes = {
  thisPlayer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setThisPlayer: PropTypes.func.isRequired,
};
