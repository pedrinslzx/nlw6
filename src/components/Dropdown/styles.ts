import styled from 'styled-components'

export const IconButton = styled.span`
  --button-size: calc(60px * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: ${p => p.theme.$gray_light};
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  &:hover {
    filter: brightness(1.2);
  }
  & > svg {
    fill: ${p => p.theme.$gray_dark};
    width: 20px;
    height: 20px;
  }
`
export const IconRight = styled.span`
  margin-left: auto;
`

export const NavBarContainer = styled.nav`
  a {
    color: ${p => p.theme.$gray_dark};
    text-decoration: none;
  }
  height: 60px;
  padding: 0 10px;
`
export const NavbarNav = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`
export const NavBarNavItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: calc(60px * 0.8);
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  > a + span {
    margin-left: 12px;
  }
`
export const Menu = styled.div`
  width: 100%;
`
export const MenuItem = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: background 400ms;
  padding: 5px;
  & ${IconButton} {
    margin-right: 5px;
    &:hover {
      filter: none;
    }
  }
  &:hover {
    background-color: ${p => p.theme.$gray_medium};
  }
`

export const DropdownContainer = styled.div`
  position: absolute;
  top: 58px;
  width: 400px;
  max-width: 70vw;
  min-height: 171px;
  max-height: 70vh;
  transform: translateX(-45%);
  background-color: ${p => p.theme.$background};
  border: 1px solid ${p => p.theme.$gray_medium};
  border-radius: 8px;
  padding: 10px;
  overflow: hidden;
  overflow-y: auto;
  transition-property: height, width;
  transition-duration: 400ms;
  transition-timing-function: ease;
  /* CSSTransition classes  */
  .menu-primary {
    &-enter {
      position: absolute;
      transform: translateX(-110%);
      &-active {
        transform: translateX(0%);
        transition: all 400ms ease;
      }
    }
    &-exit {
      position: absolute;
      &-active {
        transform: translateX(-110%);
        transition: all 400ms ease;
      }
    }
  }
  .menu-secondary {
    &-enter {
      transform: translateX(110%);
      &-active {
        transform: translateX(0%);
        transition: all 400ms ease;
      }
    }
    &-exit {
      &-active {
        transform: translateX(110%);
        transition: all 400ms ease;
      }
    }
  }
`
