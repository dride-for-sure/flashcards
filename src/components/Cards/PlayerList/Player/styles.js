import styled, { css } from 'styled-components';

const SinglePlayer = styled.div`
  position:relative;
  padding: 20px;
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 200px;
  font-family: 'Times New Roman', Times, serif;
  color: white;

  > span {
    &:first-of-type {
      position:absolute;
      top:-20px;
      right:-15px;
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
  }

  ${(props) => props.skill === 'master' && css` 
    background-color: lightcoral;
  `}

  ${(props) => props.skill === 'ninja' && css` 
    background-color: sandybrown;
  `}

  ${(props) => props.skill === 'noob' && css` 
    background-color: mediumseagreen;
  `}
`;

export default SinglePlayer;
