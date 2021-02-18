import styled, { css } from 'styled-components';

const Container = styled.div`
  ${(props) => props.skill === 'master' && css` 
    background-color: lightcoral;
  `}

  ${(props) => props.skill === 'ninja' && css` 
    background-color: sandybrown;
  `}

  ${(props) => props.skill === 'noob' && css` 
    background-color: mediumseagreen;
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
      top:-20px;
      right:-15px;
      font-size: 3rem;
    }

    &:last-of-type{
      font-style: italic;
      flex-grow: 2;
    }
  }
`;

export default Container;
