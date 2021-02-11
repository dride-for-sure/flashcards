import styled from 'styled-components';

export const ShuffleCard = styled.div`
  background-color: #666;
  padding: 20px;
  box-sizing: border-box;
  height: 200px;
  color: white;
  outline: none;
  font-weight: 600;
  z-index:2;
  background-color: turquoise;
  display:flex;
  flex-direction: column;
  font-family: 'Times New Roman', Times, serif;
  text-align:left;

  > span {
    &:first-of-type{
      font-size: 2rem;
      text-transform: uppercase;
    }
    &:last-of-type{

    }

    > fieldset {
      border:0;

      > input {
        display:none;
      }
    }
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