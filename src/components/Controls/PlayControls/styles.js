import styled, { css } from 'styled-components';

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  background-color: rgba(68,68,68,.95);
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  text-align:center;
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
  cursor: pointer;
  font-size: 1.2rem;
  padding: 12px;
  
  ${props => props.type === "play" && css`
    background-color: orangered;
  `}

  ${props => props.type === "ready" && css`
    background-color: green;
    font-size: 1.2rem;
    padding: 12px;
  `}

  ${props => props.type === "finish" && css`
    background-color: cadetblue;
  `}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: initial;
    opacity: .3;
  }
`;
