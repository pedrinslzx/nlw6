import styled from 'styled-components';

// 625 - apenas o content
// 450 - content e buttons

export const Container = styled.header`
  padding: 24px;
  border-bottom: 1px solid ${p => p.theme.$highlight};
`;

export const Content = styled.div`
  max-width: 1120px;

margin: 0 auto;

display: flex;
justify-content: space-between;
align-items: center;

> svg,
> img {
  cursor: pointer;
}

@media(max-width: 700px) {
  flex-direction: column;
}

`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  > button {
    height: 40px;
  }

  
@media(max-width: 700px) {
  margin-top: 24px;
}

@media(max-width: 600px) {
  flex-direction: column;
    width: 100%;
  > button,
  > div {
    width: 100%;
  }
}
`
