import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: darkseagreen;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  height: 200px;

  > h1 {
    text-transform: uppercase;
    padding: 0;
    margin: 0;
  }

  > span {
    font-style: italic;
    flex-grow: 2;
  }
`;

export default Container;
