import { LightTheme } from './light'

export const DarkTheme: typeof LightTheme = {
  // Default Colors
  $background: '#29292E',
  $color: '#f8f8f8',

  $primary: '#835afd',

  $gradient: 'linear-gradient(139.44deg, #485BFF 0%, #FF59F8 96.19%)',

  $google: '#ea4335',
  $danger: '#E73F5D',

  // Modal
  $overlay_color: 'rgba(5, 2, 6, 0.8)',

  $gray_dark: '#9B9C9D',
  $gray_medium: '#686873',
  $gray_light: '#333340',

  // White
  $details: '#1f1f1f',
  $white: '#FFFFFF',
  $black: '#000',

  // Pink
  $pink_dark: '#D67EE2',
  $pink_light: '#E559F9',

  // Hover
  $primary_hover: '#6F4BD8',
  $danger_hover: '#D73754',
  $gray_medium_hover: '#CECECE',
  $gray_light_hover: '#7E7E86',

  // Others Colors
  $highlight: '#333333',
  $box_shadow: 'rgba(0, 0, 0, 0.04)',
  $box_shadow_hover: 'rgba(0, 0, 0, 0.1)'
}
