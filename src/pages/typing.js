import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '@eggheadio/gatsby-theme-egghead-blog/src/components/Layout'
import Container from '@eggheadio/gatsby-theme-egghead-blog/src/components/Container'

const TypingPage = ({ data: { site, allMdx } }) => {
  return (
    <Layout site={site} title="Typing Game">
      <Container>
        <div
          css={css`
            position: relative;
            overflow: hidden;
            padding-top: 75%;
            & iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: 0;
            }
          `}
        >
          <iframe src="https://typing.jnielson.com" />
        </div>
      </Container>
    </Layout>
  )
}

export default TypingPage

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
  }
`
