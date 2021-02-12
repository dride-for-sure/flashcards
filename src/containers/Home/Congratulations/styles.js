import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  z-index:100;

  ${props => props.result === "win" && css`
    background-color: rgba(110,212,142,.8);
  `}

  ${props => props.result === "loose" && css`
    background-color: rgba(244,54,54,.8);
  `}

  ${props => props.result === "draw" && css`
    background-color: rgba(153,194,212,.8);
  `}
`;

export const Message = styled.div`
  align-self: center;
  display:flex;
  flex-direction: column;
  text-align: center;
  color: white;
  
  > span:first-of-type {
    font-size: 10rem;
  }
  > span {
    margin: 5px;
    font-size: 4rem;
  }
  > span:last-of-type{
    font-size: 2rem;
    font-style: italic;
  }
`;

export const Button = styled.button`
  border: 0;
  border-radius:5px;
  padding: 8px;
  margin: 20px 0 0;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  cursor: pointer;
  font-size: 1rem;
  padding: 12px;
  background: grey;
`;