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
const dir = `./content/blog/${date}-${slug}`
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
} else {
  throw 'That post already exists!'
}
fs.writeFileSync(
  `${dir}/index.mdx`,
  `---
slug: ${slug}
date: ${date}
title: "${title}"
published: false
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
