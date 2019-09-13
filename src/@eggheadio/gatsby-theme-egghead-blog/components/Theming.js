import { createTheming } from '@callstack/react-theme-provider'
import { lighten } from 'polished'
import colors from '../lib/colors'

const themes = {
  default: {
    themeName: 'default',
    colors: {
      primary: colors.link_color,
      text: colors.black,
      bodyBg: colors.gray,
      headerBg: colors.link_color,
      link: colors.link_color,
      ...colors,
    },
  },
  dark: {
    themeName: 'dark',
    colors: {
      primary: lighten(0.05, colors.link_color),
      text: colors.white,
      bodyBg: colors.black,
      headerBg: colors.black,
      link: lighten(0.05, colors.link_color),
      ...colors,
    },
  },
}

const { ThemeProvider, withTheme, useTheme } = createTheming(themes.default)

export { ThemeProvider, withTheme, useTheme, themes, colors }
