import styled from 'styled-components'

export const Container = styled.div`
  background: ${p => p.theme.$details};
  border-radius: 8px;
  box-shadow: 0px 2px 12px ${p => p.theme.$box_shadow};
  padding: 24px;

  & + div {
    margin-top: 8px;
  }

  > p {
    color: ${p => p.theme.$color};
  }
  > footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;

    .user_info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        margin-left: 8px;
        color: ${p => p.theme.$gray_dark};
        font-size: 14px;
      }
    }

    > div.buttons {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      gap: 16px;
    }

    button {
      border: 0;
      background-color: transparent;
      cursor: pointer;

      display: flex;
      align-items: flex-end;

      color: ${p => p.theme.$gray_dark};

      transition: filter 0.2s;

      &.on {
        color: ${p => p.theme.$primary};

        svg {
          color: ${p => p.theme.$primary_hover};
        }
      }

      &:hover {
        filter: brightness(0.8);
      }

      &.like-button {
        display: flex;
        align-items: flex-end;

        gap: 8px;
      }
    }
  }

  transition-property: background-color, border-color;

  border: 1px solid transparent;

  &.answered {
    user-select: none;
    opacity: 0.8;
  }

  &.highlighted {
    background-color: ${p => p.theme.$highlight};
    border-color: ${p => p.theme.$primary};
  }
`
