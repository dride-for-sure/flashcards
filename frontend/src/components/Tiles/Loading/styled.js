import styled from 'styled-components';

const Container = styled.div`
  background-color: tan;
  justify-content: center !important;
  
  > span {
    font-size:7rem;
    align-self:center;
    animation: pulse-animation 3s infinite;
    user-select: none;
  }

  @keyframes pulse-animation {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(.8);
  }
  100% {
    transform: scale(1.1);
  }
}
`;

export default Container;
