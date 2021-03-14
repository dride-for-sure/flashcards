import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { v4 as uuidv4 } from 'uuid';
import { usePlayerDetails } from '../../contexts/playerDetails';
import Button from '../Buttons/Button';

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
    const updatedPlayerName = event.target.value.toUpperCase();
    setTmpPlayerName(updatedPlayerName);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter ninjas name..."
        validate={(hasValidPlayerName).toString()}
        value={tmpPlayerName}
        onChange={handleChange} />
      <Button type="button" onClick={handleSubmit} />
    </Form>
  );
}

const Form = styled.div`
  position:relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-self: center;

  > input {
    margin-top: 10px;
    margin-right: 10px;
  }

  > button {
    border: solid white;
    border-width: 0 5px 5px 0;
    padding: 3px;
    margin-top:7px;
    height: 20px;
    width: 20px;
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    align-self: center;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: 4px solid white;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  font-style: italic;
  color: white;
  outline:0;

  &::placeholder {
    color: white;
  }

  ${(props) => props.validate === 'false' && css`
    color: deeppink;
  `}
`;

SetPlayerName.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  hasPlayerDetails: PropTypes.func.isRequired,
};
