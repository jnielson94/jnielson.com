import React from 'react'

import Title from './Title'
import Subtitle from './Subtitle'
import Paragraph from './Paragraph'
import Code from './Code'
import { preToCodeBlock } from 'mdx-utils'
import ListItem from './ListItem';

export default {
  h1: props => <Title {...props} />,
  h2: props => <Subtitle {...props} />,
  p: props => <Paragraph {...props} />,
  li: props => <ListItem {...props} />,
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
}
