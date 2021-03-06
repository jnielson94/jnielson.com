import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@eggheadio/gatsby-theme-egghead-blog/src/components/Layout'
import Container from '@eggheadio/gatsby-theme-egghead-blog/src/components/Container'
import SubscribeForm from '../@eggheadio/gatsby-theme-egghead-blog/components/Forms/Subscribe'

const NewsletterPage = ({ data: { site, allMdx } }) => {
  return (
    <Layout site={site} title="Join Jordan's Newsletter" noSubscribeForm>
      <Container>
        <SubscribeForm />
      </Container>
    </Layout>
  )
}

export default NewsletterPage

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
