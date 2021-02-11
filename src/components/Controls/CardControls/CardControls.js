import { useState } from "react";
import { addRandomSauce } from "../../../common/helper";
import { possibleSauces } from "../../../store/store";
import { Adder as StyledAdder, Button as StyledButton, Container as StyledContainer, Form as StyledForm, Input as StyledInput, Select as StyledSelect } from './styles';

export default function Form({ onAdd, setSauces, sauces, gameMode }) {

  const [title, setTitle] = useState("");
  const [hotness, setHotness] = useState("");

  return (
    <StyledContainer gameMode={gameMode}>
      <StyledForm onSubmit={event => {
        event.preventDefault();
        onAdd({ title: title, hotness: hotness });
        setTitle("");
        setHotness("");
      }}>
        <StyledInput
          required
          disabled={gameMode !== "empty" && gameMode !== "ready"}
          placeholder="Sauce Name?"
          value={title}
          onChange={event => setTitle(event.target.value)} />
        <StyledSelect
          required
          disabled={gameMode !== "empty" && gameMode !== "ready"}
          onChange={event => setHotness(event.target.value)}>
          <option value="" selected="selected" hidden="hidden">🔥 or not?</option>
          <option value="3">🔥🔥🔥</option>
          <option value="2">🔥🔥</option>
          <option value="1">🔥</option>
        </StyledSelect>
        <StyledButton disabled={gameMode !== "empty" && gameMode !== "ready"} bg="warning">Punch it!</StyledButton>
      </StyledForm >
      <StyledAdder>
        <StyledButton
          disabled={gameMode !== "empty" && gameMode !== "ready"}
          type="Add"
          onClick={() => setSauces(addRandomSauce(sauces, possibleSauces))}>
          Add random hot shit
        </StyledButton>
      </StyledAdder>
    </StyledContainer>
  )
}