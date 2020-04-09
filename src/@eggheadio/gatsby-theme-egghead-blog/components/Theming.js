import { createTheming } from '@callstack/react-theme-provider'
import { lighten } from 'polished'
import colors from '../lib/colors'

const themes = {
  default: {
    themeName: 'default',
    colors: {
      primary: colors.primary,
      text: colors.black,
      bodyBg: colors.gray,
      headerBg: colors.primary,
      link: colors.link_color,
      ...colors,
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: lighten(0.05, colors.primary),
      text: colors.offwhite,
      bodyBg: colors.black,
      headerBg: colors.black,
      link: colors.green3,
      ...colors,
    },
  },
}

const { ThemeProvider, withTheme, useTheme } = createTheming(themes.default)

export { ThemeProvider, withTheme, useTheme, themes, colors }
