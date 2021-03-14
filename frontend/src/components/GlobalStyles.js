import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
  }

  #root > * {

    /* BLACK */
    --color-black: black;

    /* GREEN */
    --color-green-dark: darkseagreen;
    --color-green-light: mediumseagreen;
    --color-green-light-transparent: rgba(60,179,113,.8);
    
    /* ORANGE */
    --color-orange-dark: sandybrown;
    --color-orange-medium: tan;
    --color-orange-light: antiquewhite;

    /* RED */
    --color-red-light: lightcoral;

    /* BLUE */
    --color-blue-medium: turquoise;

    /* MONOCHROM */
    --color-monochrom-dark: black;
    --color-monochrom-medium: silver;
    --color-monochrom-light: lightgrey;

    font-family: 'Times New Roman', Times, serif;
    font-size: 1rem;
    color: white;
  
    a {
    text-decoration: none;
    transition: 0.5s;
    
      &:hover {
        opacity: .7;
      }
    }
  }
`;

export default GlobalStyle;
