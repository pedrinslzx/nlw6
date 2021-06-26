import styled from "styled-components";

export const Header = styled.header`
  padding: 24px;
    border-bottom: 1px solid ${p => p.theme.$highlight};

    > div {
      max-width: 1120px;

      margin: 0 auto;

      display: flex;
      justify-content: space-between;
      align-items: center;

      > svg {
        cursor: pointer;
      }

      > div {
        display: flex;

        button {
          height: 40px;
        }

        button + button {
          margin-left: 16px;
        }
      }
    }
`

export const Main = styled.main`
  max-width: 800px;
  flex: 1;
    margin: 0 auto;
    padding: 0 32px;

    .room-title {
      margin: 32px 0 24px;

      display: flex;
      align-items: center;
      flex-direction: row;

      > h1 {
        font-family: Poppins, sans-serif;

        font-family: Poppins;
        font-weight: 700;
        font-size: 24px;
        line-height: 36px;

        color: ${p => p.theme.$color};
      }

      > span {
        margin-left: 16px;
        background-color: ${p => p.theme.$pink_dark};

        padding: 8px 16px;

        border-radius: 50px;

        color: ${p => p.theme.$background};

        font-weight: 500;

        font-size: 14px;
      }
    }
`

export const Room = styled.div`
  background: ${p => p.theme.$details};
  border-radius: 8px;
  box-shadow: 0px 2px 12px ${p => p.theme.$box_shadow};
  padding: 24px;

  cursor: pointer;

  transition-property: filter, box-shadow;
  transition-duration: 0.2s;

  &:hover {
    box-shadow: 0px 2px 12px ${p => p.theme.$box_shadow_hover};
    filter: brightness(0.9);
  }

  & + div {
    margin-top: 8px;
  }

  > p {
    color: ${p => p.theme.$color};

    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      font-weight: 600;
      font-size: 24px;
    }
    > code {
      margin-left: 16px;

      color: ${p => p.theme.$color};
      background: ${p => p.theme.$background};
      border: 1px solid ${p => p.theme.$primary};

      padding: 4px 12px;

      border-radius: 8px;

      font-size: 14px;
      font-weight: 500;
    }
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
  }
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
