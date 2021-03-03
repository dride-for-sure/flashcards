import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${(props) => props.difficulty === 'HARD' && css`
      background-color: lightcoral;
      color: white;

      > button {
        border-color: white;
        color: white;
      } 
    `}

  ${(props) => props.difficulty === 'MODERATE' && css`
    background-color: sandybrown;
    color: white;

    > button {
      border-color: white;
      color: white;
    } 
  `}

  ${(props) => props.difficulty === 'EASY' && css`
    background-color: mediumseagreen;
    color: white;

    > button {
      border-color: white;
      color: white;
    } 
  `}

  ${(props) => props.gameMode === 'play' && css`
    opacity: .5;
  `}

  ${(props) => props.status === 'selected' && css`
    transform: scale(1.2) rotate(-2deg) translate(1%,2%);
    transition-duration: .8s;
    z-index: 2;
    border: 5px solid rgba(255,255,255,.5);
    padding: 15px;
    opacity: 1;
  `}

  ${(props) => props.status === 'checked' && css`
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
  
  ${(props) => props.status === 'missed' && css`
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

  > h1 {
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
  }

  > span {
    
    &:first-of-type {
      position:absolute;
      top:-10px;
      right:-10px;
      font-size: 3rem;
    }

    &:nth-of-type(2) {
      font-style: italic;
      flex-grow: 2;
    }

    &:nth-of-type(3) {
      font-style: italic;
    }
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
