const fs = require('fs')
const slugify = require('slug')
const dateFns = require('date-fns')
const title = process.argv[2]
const publishDate = process.argv[3]
if (!title) {
  throw 'a title is required!'
}
const slug = slugify(title.toLowerCase())
if (publishDate && publishDate.length !== 10) {
  throw 'Publish date should be YYYY-MM-DD'
}
const date = publishDate
  ? publishDate
  : dateFns.format(new Date(), 'yyyy-MM-dd')
const imageDir = `./public/assets/blog/${slug}`
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir)
} else {
  throw 'That post already exists!'
}
fs.writeFileSync(
  `./_posts/${slug}.md`,
  `---
slug: ${slug}
date: ${date}
title: "${title}"
coverImage: '/assets/blog/${slug}/cover.jpg'
---

_Banner image courtesy of undraw.co_

`,
  function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(`${title} was created!`)
  },
)
