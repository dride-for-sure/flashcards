import styled, { css } from 'styled-components';

export const Container = styled.div`

> h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
  }

> form {
  position:relative;
  display: flex;
  flex-direction: row;

    > input {
      margin-top: 10px;
      margin-right: 10px;
    }

    > button {
      border: solid white;
      border-width: 0 5px 5px 0;
      padding: 3px;
      margin-top:7px;
      height: 20px;
      width: 20px;
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      align-self: center;
    }
  }
`;

export const Input = styled.input`
  background-color: transparent;
  border: 4px solid white;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
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
