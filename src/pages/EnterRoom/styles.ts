import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const SideBar = styled.aside`
  background-color: ${p => p.theme.$primary};

  flex: 7;

  display: flex;
  justify-content: center;
  flex-direction: column;

  padding: 120px 80px;

  color: ${p => p.theme.$white};

  > img {
    height: auto;
    max-width: 320px;
  }

  > strong {
    font-family: Poppins;
    font-size: 36px;
    font-weight: 700;
    line-height: 42px;

    max-width: 440px;

    margin-top: 16px;
  }

  > p {
    margin-top: 16px;

    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    max-width: 440px;

    color: ${p => p.theme.$white};
  }

  @media (max-width: 800px) {
    display: none;
    visibility: hidden;
  }
`

export const Main = styled.main`
  flex: 8;

  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;

  width: 100%;
  max-width: 320px;
`

export const Form = styled.form`
  input,
  button {
    width: 100%;
  }

  input {
    height: 50px;
    border-radius: 8px;
    padding: 0 16px;

    background-color: ${p => p.theme.$background};

    border: 1px solid ${p => p.theme.$gray_medium};
  }

  button {
    margin-top: 16px;
  }
`

export const Separator = styled.div`
  font-size: 14px;
  color: ${p => p.theme.$gray_medium};

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${p => p.theme.$gray_medium};
  }
  &::before {
    margin-right: 16px;
  }
  &::after {
    margin-left: 16px;
  }
`

export const Title = styled.h2`
  font-family: Poppins, sans-serif;
  font-size: 24px;
  line-height: 36px;
  font-weight: 700;

  align-self: center;

  margin-bottom: 24px;
`

export const Text = styled.p`
  font-size: 14px;
  color: ${p => p.theme.$gray_medium_hover};
  margin-top: 16px;

  a {
    color: ${p => p.theme.$pink_dark};
  }
`

export const Logo = styled.div`
  align-self: center;
  margin-bottom: 32px;
`
