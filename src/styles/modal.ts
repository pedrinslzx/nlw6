import { css } from 'styled-components'

export const modal = css`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: ${p => p.theme.$overlay_color};

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;

    transition-property: opacity;

    &.open,
    &.close {
      opacity: 1;
    }

    .modal {
      max-width: 590px;
      max-height: 362px;

      padding: 32px;

      width: 90vw;
      height: 55vh;

      background: ${p => p.theme.$background};
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      > .icon {
        margin-bottom: 24px;
      }

      > h2 {
        font-family: Poppins;
        font-size: 24px;

        color: ${p => p.theme.$color};

        margin-bottom: 24px;
      }

      > p {
        font-family: Roboto;
        font-size: 16px;
        color: ${p => p.theme.$gray_dark};

        margin-bottom: 36px;
      }

      > .buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 8px;

        > .button,
        > button {
          min-width: 160px;
        }
        @media(max-width:400px){
          flex-direction: column;

          width: 100%;
          > .button,
        > button {
            width: 100%;
          }
        }
      }

      opacity: 0;

      transition-property: opacity;

      &.open {
        opacity: 1;
      }

      &.close {
        opacity: 0;
      }
    }
  }
`
