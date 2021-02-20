import styled from 'styled-components';

const Container = styled.div`
    background-color: ${(props) => props.background};
  > h1 {
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    word-break: break-word;
  }

  > span {
    &:first-of-type {
      position:absolute;
      top:-20px;
      right:-15px;
      font-size: 3rem;
    }
  }
`;

export default Container;
