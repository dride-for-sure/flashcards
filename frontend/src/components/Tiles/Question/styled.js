import styled, { css } from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    color: transparent;
    text-shadow: 0 0 10px #fff;
    user-select: none;
  
    ${(props) => !props.disabled && css`
      color: white;
      text-shadow: none;
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

  > button {
    font-size: 1rem;
    color: transparent;
    text-shadow: 0 0 5px #fff;
    pointer-events: none;
    text-align:left;

    ${(props) => !props.disabled && css`
      color: white;
      text-shadow: none;
      pointer-events: all;
    `}
  }
`;

export default Container;
