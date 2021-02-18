import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0 10px;

  h1 {
    text-transform: uppercase;
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
  }

  > ul {
    max-height: 40vh;
    overflow-y: scroll;
    list-style-type: none ;
    padding-left: 10px;
    padding-top: 3px;
    margin: 20px 0 0;
  }
`;

export default Container;
