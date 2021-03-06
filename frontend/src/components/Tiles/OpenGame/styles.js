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
    flex-grow: 1;
  }

  > span {
    &:first-of-type {
      position:absolute;
      top:-18px;
      right:-13px;
      font-size: 3rem;
    }
    &:nth-of-type(2) {
      font-style: italic;
      margin-bottom: 3px;
    }
  }

  > a {
    font-size: 3.5rem;
    align-self:center;
    flex-grow: 1;
  }
`;

export default Container;
