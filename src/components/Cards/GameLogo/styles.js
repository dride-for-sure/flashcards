import styled from 'styled-components';

const Logo = styled.div`
  position:relative;
  padding: 20px;
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 200px;
  background-color: tan;
  justify-content: center;
  > span {
    font-size:7rem;
    align-self:center;
  }
`;

export default Logo;
