import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      flex-grow:1;
  }

  > span {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
     
     > button {
      border:0;
      background-color: transparent;
      font-size: 2rem;
      outline: none;
    }
  }
`;

export default Container;
