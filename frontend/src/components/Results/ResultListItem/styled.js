import styled, { css } from 'styled-components';

const Container = styled.li`
  font-size: 1.2rem;
  font-style: italic;
  text-transform: lowercase;
  
  ${(props) => props.itsMe && css`
    :after {
      content: '👈';
      margin-left: 5px;
    }
  `}
  
  :before {
    content: ${(props) => props.score};
    font-weight: 600;
    margin-right: 8px;
  }
`;

export default Container;
