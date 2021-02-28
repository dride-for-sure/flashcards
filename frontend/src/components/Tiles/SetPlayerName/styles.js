import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: mediumseagreen;
  > form {
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    > label {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
    }
  }
`;

export const Input = styled.input`
  background-color: transparent;
  border: 4px solid white;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1rem;
  font-style: italic;
  color: white;
  outline:0;

  &::placeholder {
    color: white;
  }

  ${(props) => props.validate === 'false' && css`
    color: deeppink;
  `}
`;
