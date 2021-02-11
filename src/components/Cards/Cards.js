import { Button as StyledButton, Card as StyledCard, Container as StyledContainer } from './styles';

export default function Cards({ sauces, onMissed, onChecked }) {

  return (
    <StyledContainer>
      {sauces.map((sauce) => (
        <StyledCard status={sauce.status} hotness={sauce.hotness} key={sauce.id} >
          <h2>{sauce.title} </h2>
          <p>{sauce.hotness === "3" ? "🔥🔥🔥" : sauce.hotness === "2" ? "🔥🔥" : "🔥"}</p>
          <div>
            <StyledButton disabled={sauce.status !== "selected"} onClick={() => {
              onChecked(sauce.id);
            }}>
              😎
            </StyledButton>
            <StyledButton disabled={sauce.status !== "selected"} onClick={() => {
              onMissed(sauce.id);
            }}>
              🤢
            </StyledButton>
          </div>
        </StyledCard>
      ))
      }
    </StyledContainer >
  );
}
