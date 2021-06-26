import { css } from 'styled-components'

export const modal = css`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: ${p => p.theme.$overlay_color};

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;

    transition-property: opacity;
    transition-duration: 300ms;
    transition-timing-function: ease;

    &.open,
    &.close {
      opacity: 1;
    }

    .modal {
      max-width: 590px;
      width: 100%;

      max-height: 362px;
      height: 100%;

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
        gap: 8px;
        > .button {
          min-width: 160px;
        }
      }

      opacity: 0;

      transition-property: opacity;
      transition-duration: 300ms;
      transition-delay: 100ms;
      transition-timing-function: ease;

      &.open {
        opacity: 1;
      }

      &.close {
        opacity: 0;
      }
    }
  }
`
