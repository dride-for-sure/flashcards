import styled from 'styled-components';

export const Header = styled.header`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  background-color: darkseagreen;
  color: white;
  
  > * {
    align-self:center;
  }
`;

export const H1 = styled.h1`
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  text-align:center;
`;

export const Span = styled.span`
  font-style: italic;
`;