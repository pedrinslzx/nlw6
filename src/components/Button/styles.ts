import styled from 'styled-components'

export const DefaultButton = styled.button`
  height: 50px;
  min-width: 100px;
  border-radius: 8px;
  padding: 0 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  line-height: 18.75px;

  font-weight: 500;

  border: none;
  background-color: ${p => p.theme.$primary};
  color: ${p => p.theme.$white};

  cursor: pointer;

  transition: filter 300ms;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  > .icon {
    margin-right: 8px;
  }

  &.outlined {
    border: 1px solid ${p => p.theme.$primary};
    background-color: ${p => p.theme.$background};
    color: ${p => p.theme.$primary};
  }
`

export const DangerButton = styled.button`
  height: 50px;
  min-width: 100px;
  border-radius: 8px;
  padding: 0 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  line-height: 18.75px;

  font-weight: 500;

  border: none;
  background-color: ${p => p.theme.$danger};
  color: ${p => p.theme.$white};

  cursor: pointer;

  transition: filter 300ms;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  > .icon {
    margin-right: 8px;
  }

  &.outlined {
    border: 1px solid ${p => p.theme.$danger};
    background-color: ${p => p.theme.$background};
    color: ${p => p.theme.$danger};
  }
`

export const CancelButton = styled.button`
  height: 50px;
  min-width: 100px;
  border-radius: 8px;
  padding: 0 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  line-height: 18.75px;

  font-weight: 500;

  border: none;
  background-color: ${p => p.theme.$gray_medium};
  color: ${p => p.theme.$white};

  cursor: pointer;

  transition: filter 300ms;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  > .icon {
    margin-right: 8px;
  }

  &.outlined {
    border: 1px solid ${p => p.theme.$gray_medium};
    background-color: ${p => p.theme.$gray_light};
    color: ${p => p.theme.$gray_medium};
  }
`

export const GoogleButton = styled.button`
  height: 50px;
  min-width: 100px;
  border-radius: 8px;
  padding: 0 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  line-height: 18.75px;

  font-weight: 500;

  border: none;
  background-color: ${p => p.theme.$google};
  color: ${p => p.theme.$white};

  cursor: pointer;

  transition: filter 300ms;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  > .icon {
    margin-right: 8px;
  }

  &.outlined {
    border: 1px solid ${p => p.theme.$google};
    background-color: ${p => p.theme.$background};
    color: ${p => p.theme.$google};
  }
`
