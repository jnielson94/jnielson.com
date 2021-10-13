import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@eggheadio/gatsby-theme-egghead-blog/src/components/Layout'
import Container from '@eggheadio/gatsby-theme-egghead-blog/src/components/Container'
import SubscribeForm from '../@eggheadio/gatsby-theme-egghead-blog/components/Forms/Subscribe'

const Newsletter = ({ data: { site } }) => {
  return (
    <Layout site={site} title="Join Jordan's Newsletter" noSubscribeForm>
      <Container>
        <SubscribeForm />
      </Container>
    </Layout>
  )
}

export default Newsletter

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
