/* @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from '../@eggheadio/gatsby-theme-egghead-blog/components/Theming'

// This is Prince's awesome Callout! https://prince.dev/callout
export default function Callout({ variant = 'info', children }) {
  const theme = useTheme()
  const variantStyles = {
    info: {
      borderLeft: `5px solid ${theme.colors.primary}`,
      backgroundColor: theme.colors.gray5,
    },
    // Currently unused
    danger: {
      borderLeft: '5px solid #f44336',
      backgroundColor: 'rgb(253, 236, 234)',
    },
  }
  return (
    <aside
      css={{
        padding: '1rem 2rem',
        margin: '1.5rem auto',
        p: {
          marginBottom: '0',
        },
        ...variantStyles[variant],
      }}
    >
      {children}
    </aside>
  )
}
