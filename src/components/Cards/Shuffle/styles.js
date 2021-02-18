import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${(props) => props.disabled && css`
    opacity: .5;
  `}

  ${(props) => props.gameMode === 'empty' && css`
    border-color: grey;
  `}

  ${(props) => props.disabled && css`
    opacity: .5;
  `}

  background-color: turquoise;
  border: 5px dotted transparent;

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
  }

  span {
    flex-grow: 2;
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

export const Difficulty = styled.button`
  border:0;
  background-color: transparent;
  font-size: 2rem;
  outline: none;

  &:not(:disabled):hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
