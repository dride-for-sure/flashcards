import styled from 'styled-components';

const Container = styled.div`
  background-color: turquoise;
  border: 5px dotted transparent;

  > h1 {
      font-weight: 600;
      font-size: 10rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      flex-grow:1
      align-self:center;
      text-align:center;
  }
`;

export default Container;
