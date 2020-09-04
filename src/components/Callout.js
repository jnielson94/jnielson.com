/* @jsx jsx */
import { jsx } from '@emotion/core'

// This is Prince's awesome Callout! https://prince.dev/callout
export default function Callout({ variant = 'info', children }) {
  const variantStyles = {
    info: {
      borderLeft: '5px solid rgb(119, 32, 115)',
      backgroundColor: 'hsla(303, 74%, 92%, 0.4)',
    },
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
