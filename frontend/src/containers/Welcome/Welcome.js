import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../../components/Tiles/Logo/Logo';
import SetPlayerName from '../../components/Tiles/SetPlayerName/SetPlayerName';
import Title from '../../components/Tiles/Title/Title';

export default function Welcome() {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/games');
  };

  const hasPlayerDetails = (playerDetails) => {
    if (uuidv4.validate(playerDetails.id) && playerDetails.name.length) { history.push('/games'); }
  };

  return (
    <>
      <Logo />
      <Title />
      <SetPlayerName onSubmit={handleSubmit} hasPlayerDetails={hasPlayerDetails} />
    </>
  );
}
