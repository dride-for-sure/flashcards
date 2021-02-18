import styled from 'styled-components';

const Container = styled.div`
  background-color: darkseagreen;

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
