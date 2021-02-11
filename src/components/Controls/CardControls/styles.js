import styled, { css } from "styled-components";

export const Container = styled.div`
position: fixed;
  bottom: 86px;
  background-color: #666;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;

  ${props => props.gameMode !== "empty" && props.gameMode !== "ready"
    && css`
    > * {
      opacity: 0.5;
    }`
  }
`;

export const Form = styled.form`
  display:flex;
  align-self: center;
  padding-bottom: 20px;
  > * {
    margin: 0 10px;
  }
`;

export const Input = styled.input`
  border: 0;
  border-radius:5px;
  outline: none;
  padding: 0 8px;
`;

export const Select = styled.select`
  border: 0;
  border-radius:5px;
`;

export const Button = styled.button`
  border: 0;
  border-radius:5px;
  padding: 8px;
  margin: 0 10px;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  background-color: darkorange;

  &:not(:disabled) {
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  }

  ${props => props.type === "Add" && css`
    background-color: olive;
  `}

`;

export const Adder = styled.div`
  display:flex;
  align-self: center;
`;