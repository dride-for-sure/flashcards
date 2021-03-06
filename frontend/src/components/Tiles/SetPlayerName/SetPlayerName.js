import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePlayerDetails } from '../../../contexts/playerDetails';
import Tiles from '../Tiles';
import { Container, Input } from './styles';

export default function SetPlayerName({ onSubmit, hasPlayerDetails }) {
  const [playerDetails, setPlayerDetails] = usePlayerDetails();
  const [tmpPlayerName, setTmpPlayerName] = useState(playerDetails.name);
  const hasValidPlayerName = tmpPlayerName.length > 0 && tmpPlayerName.length < 15;

  useEffect(() => {
    hasPlayerDetails(playerDetails);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasValidPlayerName) {
      setPlayerDetails({ id: uuidv4(), name: tmpPlayerName });
      onSubmit();
    }
  };

  const handleChange = (event) => {
    const updatedPlayerName = event.target.value.trim().toUpperCase();
    setTmpPlayerName(updatedPlayerName);
  };

  return (
    <Tiles bg="mediumseagreen">
      <Container>
        <form onSubmit={handleSubmit}>
          <label>
            Your ninja name?
            <Input
              type="text"
              placeholder="It has one, right?"
              validate={(hasValidPlayerName).toString()}
              value={tmpPlayerName}
              onChange={handleChange} />
          </label>
        </form>
      </Container>
    </Tiles>
  );
}

SetPlayerName.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  hasPlayerDetails: PropTypes.func.isRequired,
};
