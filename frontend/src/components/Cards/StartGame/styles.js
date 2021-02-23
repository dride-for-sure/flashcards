import styled from 'styled-components';

export const Container = styled.div`
  background-color: turquoise;
  border: 5px dotted transparent;

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      flex-grow:1
  }

  span {
    flex-grow: 1;
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

export const Difficulty = styled.button`
  border:0;
  background-color: transparent;
  font-size: 2rem;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
