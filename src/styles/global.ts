import { createGlobalStyle } from 'styled-components'

import { modal } from './modal'

export const GlobalStyles = createGlobalStyle`
  :root {
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body,
  input,
  textarea,
  button {
    font: 400 16px Roboto, sans-serif;
  }

  body,
  #root {
    width: 100vw;
    min-height: 100vh;

    background-color: ${p => p.theme.$background_color};
    color: ${p => p.theme.$color};

    overflow-x: hidden;
  }

  ${modal}
`
