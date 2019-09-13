import { darken, lighten } from 'polished'
const brand = {
  // primary: '#30CEFF', // color in favicon - looks too bright when used a lot
  // primary: '#003b4d',
  // primary: '#0078CC',
  // primary: '#5348FF',
  primary: '#1ABC9C', // green that I like
  // primary: '#D42210', // red
  // primary: '#D96E0E', // orange
  // primary: '#9B59B6', //indigo
  // primary: '#6420E5', //purple
  secondary: '#EEF4F2', //whiteish
}

const colors = {
  primary_light: `${lighten(0.55, brand.primary)}`,
  gray: '#fafafa',
  black: '#131415',
  white: '#fff',
  bg_color: '#fafafa',
  body_color: 'rgba(0,0,0,0.85)',
  link_color: brand.primary,
  link_color_hover: `${darken(0.07, brand.primary)}`,
  red: '#E86C60',
  green: '#29B573',
  blue: '#5348ff',
}

export default colors
