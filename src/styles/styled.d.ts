/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

// import { DarkTheme } from './themes/dark'
import { LightTheme } from './themes/light'

export type Theme = typeof LightTheme // & typeof DarkTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
