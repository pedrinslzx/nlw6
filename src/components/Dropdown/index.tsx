import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import {
  MdArrowBack,
  FaCalendar,
  MdChevronRight,
  MdSettings,
  MdDashboard,
  MdHome,
  FaMap,
  MdPowerSettingsNew,
  AiOutlineGoogle,
  MdWbSunny,
  FaMoon
} from 'react-icons/all'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { useToggle } from '../../hooks/useToogle'
import {
  DropdownContainer,
  IconButton,
  IconRight,
  Menu,
  MenuItem,
  NavBarContainer,
  NavbarNav,
  NavBarNavItem
} from './styles'

//#region AnotherComponents

interface NavBarProps {
  children: ReactNode
}
export function NavBar({ children }: NavBarProps): JSX.Element {
  return (
    <NavBarContainer>
      <NavbarNav>{children}</NavbarNav>
    </NavBarContainer>
  )
}

interface NavBarItemProps {
  icon: ReactNode
  children?: ReactNode
  onClick?: () => unknown
}
export function NavBarItem({
  icon,
  children,
  onClick
}: NavBarItemProps): JSX.Element {
  const [open, toggleOpen] = useToggle(false)
  return (
    <NavBarNavItem>
      <IconButton
        as="a"
        href="#"
        onClick={() =>
          typeof onClick === 'function' ? onClick() : toggleOpen()
        }
      >
        {icon}
      </IconButton>

      {(typeof onClick === 'function' ? true : open) && children}
    </NavBarNavItem>
  )
}

interface DropDownMenuPageProps {
  id: string
  activeMenu: string
  className: 'primary' | 'secondary'
  children: ReactNode
  calculateHeight: (value: number) => any
}
function DropDownMenuPage({
  activeMenu,
  id,
  className,
  children,
  calculateHeight
}: DropDownMenuPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const calcHeight = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    calculateHeight((rect?.height || 0) + 20)
  }, [calculateHeight, containerRef])

  return (
    <CSSTransition
      in={activeMenu === id}
      timeout={500}
      classNames={`menu-${className}`}
      unmountOnExit
      onEnter={calcHeight}
    >
      <Menu ref={containerRef}>{children}</Menu>
    </CSSTransition>
  )
}

type NotUseThisProperty = undefined | null

interface DropdownItemPropsWithMenuSetter {
  goToMenu: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
  onClick?: 'change-menu'
  setActiveMenu: (value: string) => any
}
interface DropdownItemPropsWithOnClick {
  goToMenu?: NotUseThisProperty
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
  onClick: () => any
  setActiveMenu?: NotUseThisProperty
}

interface DropdownItemPropsWithoutMenuSetter {
  goToMenu?: NotUseThisProperty
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
  onClick?: NotUseThisProperty
  setActiveMenu?: NotUseThisProperty
}

type DropdownItemProps =
  | DropdownItemPropsWithMenuSetter
  | DropdownItemPropsWithoutMenuSetter
  | DropdownItemPropsWithOnClick

function DropdownItem({
  goToMenu,
  children,
  leftIcon,
  rightIcon,
  setActiveMenu,
  onClick
}: DropdownItemProps) {
  return (
    <MenuItem
      href="#"
      onClick={() =>
        typeof onClick === 'function'
          ? onClick()
          : goToMenu && setActiveMenu?.(goToMenu)
      }
    >
      <IconButton>{leftIcon}</IconButton>
      {children}
      <IconRight>{rightIcon}</IconRight>
    </MenuItem>
  )
}

//#endregion AnotherComponents

export function DropdownMenu(): JSX.Element {
  const history = useHistory()
  const auth = useAuth()
  const theme = useTheme()
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elementsRect = dropdownRef.current?.getBoundingClientRect()
    setMenuHeight((elementsRect?.height || 0) + 10)
  }, [])

  return (
    <DropdownContainer style={{ height: menuHeight }} ref={dropdownRef}>
      <DropDownMenuPage
        id="main"
        className="primary"
        activeMenu={activeMenu}
        calculateHeight={setMenuHeight}
      >
        <DropdownItem leftIcon={<MdHome />} onClick={() => history.push('/')}>
          Home
        </DropdownItem>
        {auth.user ? (
          <DropdownItem
            leftIcon={<MdDashboard />}
            onClick={() => history.push('/my-rooms')}
          >
            Suas Salas
          </DropdownItem>
        ) : (
          <DropdownItem
            leftIcon={<AiOutlineGoogle />}
            onClick={() => auth.signInWithGoogle()}
          >
            Continuar com o Google
          </DropdownItem>
        )}
        {auth.user && (
          <DropdownItem
            leftIcon={<FaMap />}
            onClick={() => history.push('/rooms/new')}
          >
            Criar Sala
          </DropdownItem>
        )}
        <DropdownItem
          leftIcon={<FaCalendar />}
          onClick={() => history.push('/rooms/enter')}
        >
          Entrar em uma Sala
        </DropdownItem>
        {auth.user && (
          <DropdownItem
            leftIcon={<MdPowerSettingsNew />}
            onClick={() => auth.logout()}
          >
            Sair
          </DropdownItem>
        )}
        <DropdownItem
          leftIcon={<MdSettings />}
          rightIcon={<MdChevronRight />}
          goToMenu="options"
          setActiveMenu={setActiveMenu}
        >
          Opções
        </DropdownItem>
      </DropDownMenuPage>

      <DropDownMenuPage
        id="options"
        className="secondary"
        activeMenu={activeMenu}
        calculateHeight={setMenuHeight}
      >
        <DropdownItem
          goToMenu="main"
          leftIcon={<MdArrowBack />}
          setActiveMenu={setActiveMenu}
        >
          <h2>Opções</h2>
        </DropdownItem>
        <DropdownItem
          leftIcon={theme.currentTheme === 'light' ? <FaMoon /> : <MdWbSunny />}
          onClick={() => theme.toggle('toggle')}
        >
          Mudar para tema <i>{theme.currentTheme}</i>
        </DropdownItem>
      </DropDownMenuPage>

      <DropDownMenuPage
        id="animals"
        className="secondary"
        activeMenu={activeMenu}
        calculateHeight={setMenuHeight}
      >
        <DropdownItem
          goToMenu="main"
          leftIcon={<MdArrowBack />}
          setActiveMenu={setActiveMenu}
        >
          <h2>Animals</h2>
        </DropdownItem>
        <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
        <DropdownItem leftIcon="🐸">Frog</DropdownItem>
        <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
        <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
      </DropDownMenuPage>
    </DropdownContainer>
  )
}
