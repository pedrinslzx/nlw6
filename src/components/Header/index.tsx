import { ReactNode } from 'react'
import { HiHome, HiMenu } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { Container, Content } from './styles'

import { DropdownMenu, NavBar, NavBarItem } from '../Dropdown'
import { Logo } from '../Icons'

interface HeaderProps {
  isDashboard?: boolean
  children: ReactNode
}

export function Header({ isDashboard }: HeaderProps) {
  const history = useHistory()

  return (
    <Container>
      <Content>
        <Logo onClick={() => history.push(isDashboard ? '/' : '/my-rooms')} />

        <NavBar>
          <NavBarItem onClick={() => history.push('/')} icon={<HiHome />} />

          <NavBarItem icon={<HiMenu />}>
            <DropdownMenu></DropdownMenu>
          </NavBarItem>
        </NavBar>
      </Content>
    </Container>
  )
}
