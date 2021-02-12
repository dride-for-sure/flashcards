import { deleteAllQuestions } from '../../common/helper';
import { Button, Container, Message } from './styles';

export const Congratulations = ({ result, setQuestions, counter }) => {

  const count = <span>🤟 {counter.checked} / ☠️ {counter.missed}</span>;
  const btn = <Button onClick={() => setQuestions(deleteAllQuestions())}>Again, again and again!</Button>;
  const win = <Message><span>🏅</span>{count}<span>Well done! Praise the nerd!</span>{btn}</Message>;
  const draw = <Message><span>🤒</span>{count}<span>Well, trying is not enough...</span>{btn}</Message>;
  const loose = <Message><span>☠️ </span>{count}<span>This was probably nothing</span>{btn}</Message >;

  return (
    <Container result={result}>
      {result === "win" ? win : null}
      {result === "draw" ? draw : null}
      {result === "loose" ? loose : null}
    </Container >

  );
}

export default Congratulations;
