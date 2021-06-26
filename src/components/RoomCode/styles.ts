import styled from 'styled-components'

export const Container = styled.div`
  height: 40px;
  border-radius: 8px;

  overflow: hidden;
  background: ${p => p.theme.$background};
  border: 1px solid ${p => p.theme.$primary};
  cursor: pointer;

  display: flex;

  align-items: center;
  justify-content: center;
`

export const Icon = styled.div`
  background: ${p => p.theme.$primary};
  padding: 0 12px;
  display: flex;
  height: 100%;

  justify-content: center;
  align-items: center;
`

export const Text = styled.span`
  display: block;
  align-self: center;
  flex: 1;
  padding: 0 16px 0 12px;
  width: 180px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`
