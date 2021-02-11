import { deleteAllSauces, selectRandomSauce } from '../../../common/helper';
import { Button as StyledButton, Footer as StyledFooter } from './styles';

export default function Controls({ setSauces, sauces, gameMode }) {

  const btn = gameMode === "play" ? "Give up!" : gameMode === "finish" ? "Restart" : "Let's taste!";

  return (
    <StyledFooter>
      <StyledButton
        disabled={gameMode !== "ready" && gameMode !== "play" && gameMode !== "finish"}
        type={gameMode}
        onClick={() => { gameMode === "ready" ? setSauces(selectRandomSauce(sauces)) : setSauces(deleteAllSauces()); }
        }>
        {btn}
      </StyledButton>
    </StyledFooter >
  )
}