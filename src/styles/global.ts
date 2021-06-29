import { createGlobalStyle } from 'styled-components'

import { modal } from './modal'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after,
  :root {
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    transition-property: all;
    transition-duration: 100ms;
    transition-delay: 0ms;
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

    background-color: ${p => p.theme.$background};
    color: ${p => p.theme.$color};

    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 0.8rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${p => p.theme.$gray_medium};
    &:hover {
      background: ${p => p.theme.$gray_medium_hover};
    }
  }

  ${modal}
`
