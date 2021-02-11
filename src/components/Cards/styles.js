import styled, { css } from 'styled-components';

export const Container = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px 20px;
  padding: 20px;
`;

export const Card = styled.div`
    border: 2px dotted;
    padding: 20px;
    display:flex;
    flex-direction: column;
    
   
    ${props => props.hotness === "3" && css`
        background-color: orangered;
        color: white;

        > button {
          border-color: white;
          color: white;
        } 
      `}

    ${props => props.hotness === "2" && css`
      background-color: orange;
      color: white;

      > button {
        border-color: white;
        color: white;
      } 
    `}

    ${props => props.hotness === "1" && css`
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
  width: 50%;
  border: 0;
  font-size: 2.5rem;
  background-color: transparent;

  &:not(:disabled):hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;