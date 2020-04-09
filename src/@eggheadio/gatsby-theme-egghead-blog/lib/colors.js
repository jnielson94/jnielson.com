import { darken, lighten } from 'polished'

const figmaColors = {
  /* Gray 1 */
  gray1: '#131415',
  /* 60% Gray1 */
  gray1_60: 'rgba(19, 20, 21, 0.6)',
  /* Gray 2 */
  gray2: '#4F4F4F',
  /* Gray 3 */
  gray3: '#0D2629',
  /* Gray 4 */
  gray4: '#BDBDBD',
  /* Gray 5 */
  gray5: '#E0E0E0',
  /* Gray 6 */
  gray6: '#FAFAFA',
  /* White */
  white: '#FFFFFF',
  /* Red */
  red: '#EB5757',
  /* Orange */
  orange: '#F2994A',
  /* Yellow */
  yellow: '#F2C94C',
  /* Text Green */
  textGreen: '#175E1B',
  /* Green 1 */
  green1: '#219653',
  /* Green 2 */
  green2: '#27AE60',
  /* Green 3 */
  green3: '#1ABC9C',
  /* Green 4 */
  green4: '#1DD2AF',
  /* Blue 1 */
  blue1: '#45979A',
  /* Blue 2 */
  blue2: '#2D9CDB',
  /* Blue 3 */
  blue3: '#95E6FF',
  /* Purple 1 */
  purple1: '#9B51E0',
  /* Purple 2 */
  purple2: '#BB6BD9',
  /* Offwhite */
  offwhite: '#EEF4F2',
}

const colors = {
  ...figmaColors,
  primary_light: `${lighten(0.55, figmaColors.green3)}`,
  primary: figmaColors.green3,
  secondary: figmaColors.offwhite,
  gray: figmaColors.gray6,
  black: figmaColors.gray1,
  white: figmaColors.white,
  bg_color: figmaColors.gray6,
  body_color: 'rgba(0,0,0,0.85)',
  link_color: figmaColors.textGreen,
  link_color_hover: `${darken(0.07, figmaColors.textGreen)}`,
  green: figmaColors.green2,
  blue: figmaColors.blue2,
}

export default colors
