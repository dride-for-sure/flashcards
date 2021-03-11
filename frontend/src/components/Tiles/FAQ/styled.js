import styled from 'styled-components';

const Container = styled.div`

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      word-break: break-word;
  }

  > span {
    margin-top: 10px;
    font-style: italic;
    flex-grow: 2;
    display:block;
  }
`;

export default Container;
