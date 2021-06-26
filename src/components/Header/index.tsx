import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

import { Logo } from '../Icons';


interface HeaderProps {
  isDashboard?: boolean
  children: ReactNode
}

export function Header({ isDashboard, children }: HeaderProps) {
  const history = useHistory()

  return (
    <Container>
      <div className="content">
        <Logo onClick={() => history.push(isDashboard ? '/' : '/my-rooms')} />

        <div>
          {children}
        </div>
      </div>
    </Container>
  );
};
