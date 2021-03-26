import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 1.125rem;
    line-height: 1.6;
    font-weight: 400;
    font-family: sans-serif;
    box-sizing: border-box;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: white;
  }

  input {
    outline:none;
  }
  button {
    outline:none;
  }
`;

export default GlobalStyle;
