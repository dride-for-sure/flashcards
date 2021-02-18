import styled, { css } from 'styled-components';

const Container = styled.div`
  ${(props) => props.gameMode === 'play' && css`
    background-color: khaki;
  `}

  ${(props) => props.gameMode === 'prepared' && css`
    border: 5px dotted grey;
  `}

  background-color: thistle;
  border: 5px dotted transparent;

  &:disabled {
    opacity: .5;
  }

  &:not(:disabled){
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  }

  > h1 {
    flex-grow:2;
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
  }
`;

export default Container;
