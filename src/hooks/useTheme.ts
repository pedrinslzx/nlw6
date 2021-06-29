import { useContext } from 'react'
import { useTheme as useStyledComponentsTheme } from 'styled-components'

import { ThemeContext } from '../contexts/ThemeContext'

export function useTheme() {
  const theme = useContext(ThemeContext)
  const styledTheme = useStyledComponentsTheme()
  return { ...theme, styledTheme }
}
