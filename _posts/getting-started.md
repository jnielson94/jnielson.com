---
slug: getting-started
date: '2019-03-24'
title: 'Getting Started with the gatsby-eggheadio-blog-starter'
description: 'Notes from when I was getting this site set up with a blog'
author: 'Jordan Nielson'

coverImage: '/assets/blog/banner.png'
---

The
[gatsby-starter-egghead-blog](https://github.com/eggheadio/gatsby-starter-egghead-blog)
was recommended to me by [@chrisbiscardi](https://twitter.com/chrisbiscardi) as
an option that is the most
["batteries included" blog starter](https://twitter.com/chrisbiscardi/status/1109614914073575424).
I was tempted to start with a theme approach, but realized that I eventually
wanted to be able to dig into the gatsby internals and learn more about them.
Taking that into consideration, the starter (boilerplate) was much more
appealing for getting up and running quickly.

The rest of this post will be some notes that I took throughout getting started
with this setup.

### Getting Started Notes

- Edit `./config/website` in order to replace the metadata with your information
  - Will require a restart of the dev server in order to reflect some config
    changes
  - googleAnalyticsID -> Check out this post for information on how to only have
    analytics in production, by
    [Chase Adams](https://chaseonsoftware.com/netlify-gatsby-analytics/)
- `./config/theme` has a series of pre-selected primary color options that look
  good
- `./content/blog` contains a bunch of demo posts that you'll probably want to
  delete
  - Make sure to leave the frontmatter-placeholder folder as it contains an
    example of each frontmatter that is expected to exist
- `./src/components/mdx/{Title,Subtitle}.js` - I chose to edit these and adjust
  the fontSize to be rem values - 2rem and 1.5rem specifically, in order to
  better fit in with the typography scale
- If you, like me, didn't want to pay for convertkit without having content to
  email out, then you'll want to adjust the logic in the `handleSubmit` function
  for the form under `./src/components/Forms/Subscribe.js` to change what
  happens when someone submits.
- There was a warning in the console on startup that said:

> `warning The GraphQL query in the non-page component "./src/components/Header.js" will not be run.`

> `Exported queries are only executed for Page components. It's possible you're trying to create pages in your gatsby-node.js and that's failing for some reason.`

> `If the failing component(s) is a regular component and not intended to be a page component, you generally want to use a <StaticQuery> (https://gatsbyjs.org/docs/static-query) instead of exporting a page query.`

- In order to fix this one, I opened up the Header component it mentioned, and
  found that it was indeed exporting a `pageQuery`, so I looked up
  `gatsby staticquery` as the warning mentioned and found
  [these docs](https://www.gatsbyjs.org/docs/static-query/). A little ways down
  it mentioned that there's a hook for that, which sounded good to me! Here's
  [the docs](https://www.gatsbyjs.org/docs/use-static-query/). Conveniently
  their example is about a Header, which made it super easy to transition from a
  pageQuery to getting the data with a hook.

- While I was in the Header file, I found that there was a commented out link to
  the "Blog Page" which lists all the blogs. That sounded like something I would
  want on, so I uncommented it and it works wonderfully. The color isn't the
  same as the other links, but I think that's to make it clear it is a nav link
  and not the same as the "home" link.

- On a side note, I tried to get this going in CodeSandbox, but ran into an
  issue where it was telling me that my server-side sandbox was out of space,
  resulting in the yarn install failing. I didn't want to take the time to look
  into it, since I could just push it up to github and clone it locally.

- You'll also want to adjust the favicons so that they aren't egghead (unless
  you just love egghead!). I utilized [vectr.com](https://vectr.com/) to create
  a favicon image, and then
  [realfavicongenerator.net](https://realfavicongenerator.net/) to generate the
  different files needed - and it looked to pretty well replace what was already
  here!

### Things to look into as I get going

- It looks like there's support for a dark mode, possibly? I'll have to dig into
  it, and figure out what it would take to complete that (since I assume there's
  not a toggle due to incomplete support)
- What would it look like to add tags to the posts? I'm intending to use this
  blog for more than just Tech stuff, so it would be nice to support tags.
- I've seen that some people have it set up to search their blog/site (jason
  lengstorf particularly), is that worth it? There was an email today about a
  new
  [egghead course on Algolia!](https://egghead.io/courses/getting-started-with-algolia-instantsearch-js)

### Other Notes

- Banner images from undraw.co are awesome!

_Banner image courtesy of undraw.co_
