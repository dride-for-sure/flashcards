import styled from 'styled-components';

export const Container = styled.div`
  background-color: tan;
  justify-content: center !important;
  
  > span {
    font-size:7rem;
    align-self:center;
    animation: pulse-animation 3s infinite;
  }
`;

export const StartGame = styled.button`
  border:0;
  background-color: transparent;
  font-size: 7rem;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
