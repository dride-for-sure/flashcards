import styled, { css } from 'styled-components';

export const Button = styled.button`
  background-color: #666;
  padding: 20px;
  box-sizing: border-box;
  height: 200px;
  border: 5px dotted grey;
  font-family: 'Times New Roman', Times, serif;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  background-color: thistle;
  font-size: 2rem;
  display:flex;
  text-transform: uppercase;
  text-align:left;

  ${props => props.gameMode === "play" && css`
    background-color: tomato;
  `}

  &:not(:disabled) {
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;
