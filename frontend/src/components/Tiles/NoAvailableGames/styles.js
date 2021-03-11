import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

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
  }
`;

export default Container;
