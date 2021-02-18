import PlayerList from './PlayerList/PlayerList';
import { Center, Container, H1, Slogan, Subtitle } from './styles';

export default function Lobby() {
  return (
    <Container>
      <Center>
        <H1>Drop it like its hot</H1>
        <Subtitle>Awesome coding transfunctioner</Subtitle>
        <PlayerList />
        <Slogan>May be the octocat with you</Slogan>
      </Center>
    </Container>
  );
}
