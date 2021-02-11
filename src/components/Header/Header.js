import { H1 as StyledH1, Header as StyledHeader, Span as StyledSpan } from './styles';

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Drop it like its hot</StyledH1>
      <StyledSpan>Awesome sauce transfunctioner</StyledSpan>
    </StyledHeader>
  );
}