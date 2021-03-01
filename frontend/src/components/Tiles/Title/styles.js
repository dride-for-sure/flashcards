import styled from 'styled-components';

const Container = styled.div`
  background-color: darkseagreen;

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
  }

  > span {
    margin-top: 10px;
    font-style: italic;
    flex-grow: 2;
  }
`;

export default Container;
