import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from '@eggheadio/gatsby-theme-egghead-blog/src/components/Layout'
import Link from '@eggheadio/gatsby-theme-egghead-blog/src/components/Link'
import { useTheme } from '@eggheadio/gatsby-theme-egghead-blog/src/components/Theming'
import Container from '@eggheadio/gatsby-theme-egghead-blog/src/components/Container'
import { rhythm } from '@eggheadio/gatsby-theme-egghead-blog/src/lib/typography'

const SuccessPage = ({ data: { site, allMdx } }) => {
  const theme = useTheme()
  return (
    <Layout site={site} noSubscribeForm>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <div>
          <h2>Thanks for Subscribing!</h2>
          <p>
            I send out emails about things like blog posts that I've written or
            things I run into but haven't put into a blog post yet. Feel free to
            check out my latest post:
          </p>
        </div>
        {allMdx.edges.map(({ node: post }) => (
          <Link
            key={post.id}
            css={css`
              margin-bottom: 40px;
              display: flex;
              align-items: baseline;
              & h3 {
                margin-top: 0;
              }
            `}
            to={post.frontmatter.slug}
            aria-label={`View ${post.frontmatter.title}`}
          >
            <h3
              css={css({
                marginBottom: rhythm(0.3),
                transition: 'all 150ms ease',
              })}
            >
              {post.frontmatter.title}
            </h3>
            <div
              css={css`
                width: 2ch;
              `}
            />
            Read Article →
          </Link>
        ))}
        <hr />
        <img src="/images/undraw_newsletter.svg" />
      </Container>
    </Layout>
  )
}

export default SuccessPage

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
      limit: 1
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
