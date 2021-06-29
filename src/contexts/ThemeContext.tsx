import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import * as allThemes from '../styles/theme'

type Themes = keyof typeof allThemes

type ThemeToggle = Themes | 'system' | 'toggle'

interface ThemeContextType {
  currentTheme: Themes
  toggle: (to: ThemeToggle) => void
}

export const ThemeContext = createContext({} as ThemeContextType)

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

  const toggle = useCallback(
    (to: ThemeToggle) => {
      if (to === 'system') {
        const systemThemeIsDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        )
        if (systemThemeIsDark.matches) {
          setCurrentTheme('dark')
        } else {
          setCurrentTheme('light')
        }
      } else if (to === 'toggle') {
        if (currentTheme === 'light') {
          setCurrentTheme('dark')
        } else {
          setCurrentTheme('light')
        }
      } else {
        setCurrentTheme(to)
      }
    },
    [currentTheme, setCurrentTheme]
  )

  return (
    <ThemeContext.Provider value={{ currentTheme, toggle }}>
      <StyledThemeProvider theme={allThemes[currentTheme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
