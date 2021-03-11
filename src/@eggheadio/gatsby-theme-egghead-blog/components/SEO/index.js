import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SchemaOrg from '@eggheadio/gatsby-theme-egghead-blog/src/components/SEO/SchemaOrg'

const SEO = ({ postData, frontmatter = {}, postImage, isBlogPost, title }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            image
            twitterUrl
            fbAppID
            author {
              name
            }
            organization {
              name
              url
              logo
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta =
        frontmatter || postData.childMarkdownRemark.frontmatter || {}
      const pickedTitle = isBlogPost
        ? postMeta.title
        : title
        ? title
        : seo.siteTitle || "Jordan Nielson's Site"
      const description = postMeta.description || seo.description
      const NETLIFY_URL = 'https://jordans-images.netlify.app/opengraph?'
      const image = `${NETLIFY_URL}title=${encodeURIComponent(pickedTitle)}${
        postMeta.tags ? `&tags=${encodeURIComponent(postMeta.tags)}` : ''
      }` // TODO: Add dynamic author?
      const url = postMeta.slug
        ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}`
        : seo.canonicalUrl
      const datePublished = isBlogPost ? postMeta.datePublished : false
      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{pickedTitle}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <link rel="canonical" href={url} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={pickedTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={seo.fbAppID} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={seo.twitterUrl} />
            <meta name="twitter:title" content={pickedTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={pickedTitle}
            image={image}
            description={description}
            datePublished={datePublished}
            canonicalUrl={seo.canonicalUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  postImage: PropTypes.string,
  title: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null,
}

export default SEO
