import { H1 as StyledH1, Header as StyledHeader, Span as StyledSpan } from './styles';

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Awesome sauce <br />transfunctioner</StyledH1>
      <StyledSpan>hot or not...</StyledSpan>
    </StyledHeader>
  );
}