import React from 'react'

import Title from '@eggheadio/gatsby-theme-egghead-blog/src/components/mdx/Title'

import Subtitle from '@eggheadio/gatsby-theme-egghead-blog/src/components/mdx/Subtitle'
import Paragraph from '@eggheadio/gatsby-theme-egghead-blog/src/components/mdx/Paragraph'
import Code from '@eggheadio/gatsby-theme-egghead-blog/src/components/mdx/Code'

export default {
  h1: props => <Title {...props} />,
  h2: props => <Subtitle {...props} />,
  'li.p': props => <Paragraph style={{ display: 'inline-block' }} {...props} />,
  p: props => <Paragraph {...props} />,
  code: Code,
  pre: preProps => <pre {...preProps} />,
}
