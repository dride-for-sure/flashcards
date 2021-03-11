import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Times New Roman', Times, serif;
    color: white;
  }

  a {
    text-decoration: none;
    transition: 0.5s;
    
    &:hover {
      opacity: .7;
    }
  }
`;

export default GlobalStyle;
