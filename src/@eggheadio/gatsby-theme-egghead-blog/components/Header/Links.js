import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { useTheme } from '@eggheadio/gatsby-theme-egghead-blog/src/components/Theming'
import ThemeToggler from '@eggheadio/gatsby-theme-egghead-blog/src/components/Header/ThemeToggler'

const hoverCSS = css`
  &:hover {
    color: white;
    text-decoration: underline;
  }
`

export default () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Link
        to="/blog"
        activeClassName="active"
        aria-label="View blog page"
        css={hoverCSS}
      >
        Blog
      </Link>
      <Link
        to="/newsletter"
        activeClassName="active"
        aria-label="Join the newsletter"
        css={hoverCSS}
      >
        Newsletter
      </Link>
      <Link
        to="/typing"
        activeClassName="active"
        aria-label="Play a typing game"
        css={hoverCSS}
      >
        Typing Game
      </Link>

      <ThemeToggler
        css={{}}
        toggleTheme={theme.toggleTheme}
        themeName={theme.themeName}
      />
    </React.Fragment>
  )
}
