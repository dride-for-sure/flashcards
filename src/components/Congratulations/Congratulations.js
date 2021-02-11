import { deleteAllSauces } from '../../common/helper';
import { Button as StyledButton, Container as StyledContainer, Message as StyledMessage } from './styles';

export const Congratulations = ({ result, messages, setSauces, counter }) => {

  const count = <span>🤟 {counter.checked} / ☠️ {counter.missed}</span>;
  const btn = <StyledButton onClick={() => setSauces(deleteAllSauces())}>Again, again and again!</StyledButton>;
  const win = <StyledMessage><span>🏅</span>{count}<span>Well done! Praise the {messages.win}!</span>{btn}</StyledMessage>;
  const draw = <StyledMessage><span>🤒</span>{count}<span>Well, trying is not enough...</span>{btn}</StyledMessage>;
  const loose = <StyledMessage><span>☠️ </span>{count}<span>This was probably nothing</span>{btn}</StyledMessage >;

  return (
    <StyledContainer result={result}>
      {result === "win" ? win : null}
      {result === "draw" ? draw : null}
      {result === "loose" ? loose : null}
    </StyledContainer >

  );
}

export default Congratulations;
