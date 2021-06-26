import styled from 'styled-components'

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
  margin: 0 auto;
  padding: 0 32px;
`

export const Form = styled.form`
  textarea {
    width: 100%;
    padding: 16px;

    background-color: ${p => p.theme.$details};

    border-radius: 8px;
    border: 1px solid transparent;

    box-shadow: 0px 2px 12px ${p => p.theme.$box_shadow};
    resize: vertical;

    transition-property: filter, border-color;

    min-height: 130px;

    &:hover {
      outline: 0;
      filter: brightness(0.9);
      border-color: ${p => p.theme.$primary_hover};
    }

    &:focus {
      outline: 0;
      border-color: ${p => p.theme.$primary};
    }
  }
`

export const FormFooter = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;

  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      margin-left: 8px;
      color: ${p => p.theme.$color};
      font-weight: 500;
      font-size: 14px;
    }
  }

  > span {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;

    color: ${p => p.theme.$gray_medium_hover};

    > button {
      font-weight: 500;
      display: inline;
      border: 0;
      background: none;

      cursor: pointer;

      text-decoration-line: underline;
      color: ${p => p.theme.$primary};
    }
  }
`

export const RoomTitle = styled.div`
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

    color: ${p => p.theme.$white};

    font-weight: 500;

    font-size: 14px;
  }
`

export const RoomContent = styled.div`
  margin-top: 32px;
  padding-bottom: 32px;
`
export const NoQuestions = styled(RoomContent)`
  display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    text-align: center;

    svg {
      margin-bottom: 16px;
    }

    h2 {
      margin-bottom: 8px;

      font-family: Poppins;
      font-weight: 600;
      font-size: 18px;

      color: ${p => p.theme.$color};
      font-weight: 600;
    }

    p {
      max-width: 300px;

      font-size: 14px;
      line-height: 21px;
      color: ${p => p.theme.$gray_dark};
    }
`

