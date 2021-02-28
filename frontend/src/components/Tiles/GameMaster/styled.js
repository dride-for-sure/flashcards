import styled from 'styled-components';

const Container = styled.div`
  background-color: tan;
  justify-content: center !important;
  
  > span {
    font-size:7rem;
    align-self:center;
    animation: pulse-animation 3s infinite;
  }
`;

export default Container;
