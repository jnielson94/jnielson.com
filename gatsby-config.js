const config = require('./config/website')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + config.pathPrefix,
    title: config.siteTitle,
    description: config.siteDescription,
    keywords: ['Blogger', 'JavaScript', 'React', 'babel', 'webpack'],
    canonicalUrl: config.siteUrl,
    twitterUrl: config.twitterUrl,
    twitterHandle: config.twitterHandle,
    fbAppID: '',
    githubUrl: config.github,
    githubHandle: config.githubHandle,
    image: config.siteLogo,
    author: {
      name: config.author,
      minibio: `
        Jordan Nielson is a husband, father, software developer, 
        and member of The Church of Jesus Christ of Latter-day Saints. 
      `,
    },
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-remark-images',
      options: {
        backgroundColor: '#fafafa',
        maxWidth: 1035,
      },
    },
    {
      resolve: `@eggheadio/gatsby-theme-egghead-blog`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
  ],
}
