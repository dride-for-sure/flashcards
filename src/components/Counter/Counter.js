import { Checked as StyledChecked, Container as StyledContainer, Missed as StyledMissed, Separator as StyledSeparator } from './styles';

export default function Counter({ counter }) {
  return (
    <StyledContainer>
      <StyledChecked>{counter.checked}</StyledChecked>
      <StyledSeparator>/</StyledSeparator>
      <StyledMissed>{counter.missed}</StyledMissed>
    </StyledContainer>
  );
}