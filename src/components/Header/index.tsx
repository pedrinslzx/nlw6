import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content, Buttons } from './styles';

import { Logo } from '../Icons';


interface HeaderProps {
  isDashboard?: boolean
  children: ReactNode
}

export function Header({ isDashboard, children }: HeaderProps) {
  const history = useHistory()

  return (
    <Container>
      <Content>
        <Logo onClick={() => history.push(isDashboard ? '/' : '/my-rooms')} />

        <Buttons>
          {children}
        </Buttons>
      </Content>
    </Container>
  );
};
