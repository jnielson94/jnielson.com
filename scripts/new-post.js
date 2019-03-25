const fs = require('fs')
const slugify = require('slug')
const dateFns = require('date-fns')
const title = process.argv[2]
if (!title) {
  throw 'a title is required!'
}
const slug = slugify(title.toLowerCase())
const date = dateFns.format(new Date(), 'YYYY-MM-DD')
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
---`,
  function(err) {
    if (err) {
      return console.log(err)
    }
    console.log(`${title} was created!`)
  },
)
