import styled, { css } from 'styled-components';

export const Card = styled.div`
    position:relative;
    padding: 20px;
    display:flex;
    flex-direction: column;
    background-color: #666;
    box-sizing: border-box;
    height: 200px;
    font-family: 'Times New Roman', Times, serif;
    
    > span {
      &:first-of-type {
        position:absolute;
        top:-10px;
        right:-10px;
        font-size: 3rem;
      }
      &:nth-of-type(2) {
        font-weight: 600;
        font-size: 2rem;
        text-transform: uppercase;
      }
      &:nth-of-type(3) {
        font-style: italic;
      }
      &:last-of-type {
        font-weight:600;
      }
    }
    
   
    ${props => props.nerdfactor === "3" && css`
        background-color: lightcoral;
        color: white;

        > button {
          border-color: white;
          color: white;
        } 
      `}

    ${props => props.nerdfactor === "2" && css`
      background-color: sandybrown;
      color: white;

      > button {
        border-color: white;
        color: white;
      } 
    `}

    ${props => props.nerdfactor === "1" && css`
      background-color: mediumseagreen;
      color: white;

      > button {
        border-color: white;
        color: white;
      } 
    `}

    ${props => props.status === "selected" && css`
      
      transform: scale(1.2) rotate(-2deg) translate(1%,2%);
      transition-duration: .8s;
      z-index: 2;
    `}

    ${props => props.status === "checked" && css`
      
      display: flex;
      justify-content: center;
      opacity: 0.5;
      
      > * {
        display:none;
      }

      &:after {
        content:'🤟';
        font-size:5rem;
        align-self:center;
      }
    `}

    ${props => props.status === "missed" && css`
      
      display: flex;
      justify-content: center;
      opacity: 0.5;
      
      > * {
        display:none;
      }

      &:after {
        content:'☠️';
        font-size:5rem;
        align-self:center;
      }
    `}

    h2 {
      margin: 0;
    }

    p {
      margin: 5px 0;
    }
`;

export const Button = styled.button`
  border: 0;
  font-size: 1rem;
  background-color: transparent;
  color: white;
  outline:none;

  &:disabled {
    display:none;
  }

  &:not(:disabled):hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;