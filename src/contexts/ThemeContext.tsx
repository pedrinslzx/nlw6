import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'

import * as allThemes from '../styles/theme'

type Themes = keyof typeof allThemes

interface ThemeContextType {
  currentTheme: Themes
  toggle: (to: Themes | 'system') => void
}

export const ThemeContext = createContext({} as ThemeContextType)

const Button = styled.button`
  position: absolute;
  cursor: pointer;

  top: 0.75rem;
  right: 0.75rem;

  z-index: 10000;

  border: none;
  background: none;
`

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Themes>(() => {
    const inLocalStorage = window.localStorage.getItem('theme')
    if (inLocalStorage) return inLocalStorage as Themes
    const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)')
    if (systemThemeIsDark.matches) {
      return 'dark'
    } else {
      return 'light'
    }
  })

  useEffect(() => {
    window.localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  const toggle = useCallback((to: Themes | 'system') => {
    if (to === 'system') {
      const systemThemeIsDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      )
      if (systemThemeIsDark.matches) {
        setCurrentTheme('dark')
      } else {
        setCurrentTheme('dark')
      }
    } else {
      setCurrentTheme(to)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ currentTheme, toggle }}>
      <StyledThemeProvider theme={allThemes[currentTheme]}>
        {children}
      </StyledThemeProvider>
      <Button
        role="switch"
        aria-checked={currentTheme === 'dark'}
        onClick={() => toggle(currentTheme === 'dark' ? 'light' : 'dark')}
      >
        {currentTheme === 'dark' ? (
          <FaSun color={allThemes[currentTheme].$color} />
        ) : (
          <FaMoon color={allThemes[currentTheme].$color} />
        )}
      </Button>
    </ThemeContext.Provider>
  )
}
