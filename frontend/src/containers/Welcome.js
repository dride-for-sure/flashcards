import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { validate as uuidValidate } from 'uuid';
import SetPlayerName from '../components/Tiles/SetPlayerName';

export default function Welcome() {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/games');
  };

  const hasPlayerDetails = (playerDetails) => {
    if (uuidValidate(playerDetails.id) && playerDetails.name.length) { history.push('/games'); }
  };

  return (
    <Container>
      <Logo>⛩️</Logo>
      <Title>Mortal Coding Combat</Title>
      <Subtitle>Fight like the snake in the eagles shadow</Subtitle>
      <SetPlayerName onSubmit={handleSubmit} hasPlayerDetails={hasPlayerDetails} />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-green-light);
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 10rem;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  align-self: center;
  margin: 10px 0 5px;
  text-align:center;
  text-transform: uppercase
`;

const Subtitle = styled.div`
  font-size: 1rem;
  font-style: italic;
  align-self: center;
  margin: 0 0 20px;
`;
