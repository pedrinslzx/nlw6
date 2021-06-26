import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${p => p.theme.$highlight};

  > div {
    max-width: 1120px;

    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    > svg,
    > img {
      cursor: pointer;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;

      > button {
        height: 40px;
      }
    }
  }
`;
