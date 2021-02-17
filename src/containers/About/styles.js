import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  justify-content:center;
  padding: 20px;
  height: 100vh;
`;

export const Center = styled.div`
  position: relative;
  align-self: center;
  display: flex;
  flex-direction: column;
  background-color: lightgreen;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  width: 30vh;
  height: 30vh;

  > a > span {
    position:absolute;
    top:-10px;
    right:-10px;
    font-size: 3rem;
  }
  > a {
    text-decoration: none;
    color: white;
  
      & > *:hover {
      opacity: .8;
  }
  
  h1 {
    text-transform: uppercase;
    word-break: break-word;
    padding: 0;
    margin: 0;
  }
`;
