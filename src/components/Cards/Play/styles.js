import styled, { css } from 'styled-components';

const Container = styled.div`
  background-color: thistle;
  border: 5px dotted transparent;

  ${(props) => props.gameMode === 'play' && css`
    background-color: khaki;
  `}

  ${(props) => props.gameMode === 'prepared' && css`
    border: 5px dotted grey;
  `}

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
  }
`;

export default Container;
