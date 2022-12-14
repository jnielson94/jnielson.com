const fs = require('fs')
const blogPath = './content/blog'
console.log(fs.readdirSync(blogPath))
const posts = fs.readdirSync(blogPath)
posts.forEach((post) => {
  let [, slug] = /\d{4}-\d{2}-\d{2}-(.*)/.exec(post)
  directoryContents = fs.readdirSync(blogPath + '/' + post)
  fs.copyFileSync(`${blogPath}/${post}/index.mdx`, `./_posts/${slug}.md`)
  const imageDir = `./public/assets/blog/${slug}`
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir)
  }
  directoryContents
    .filter((item) => item != 'index.mdx')
    .forEach((image) => {
      fs.copyFileSync(
        `${blogPath}/${post}/${image}`,
        `./public/assets/blog/${slug}/${image}`,
      )
    })
})
// if (!title) {
//   throw 'a title is required!'
// }
// const slug = slugify(title.toLowerCase())
// if (publishDate && publishDate.length !== 10) {
//   throw 'Publish date should be YYYY-MM-DD'
// }
// const date = publishDate
//   ? publishDate
//   : dateFns.format(new Date(), 'yyyy-MM-dd')
// const imageDir = `./public/assets/blog/${slug}`
// if (!fs.existsSync(imageDir)) {
//   fs.mkdirSync(imageDir)
// } else {
//   throw 'That post already exists!'
// }
// fs.writeFileSync(
//   `./_posts/${slug}.md`,
//   `---
// slug: ${slug}
// date: ${date}
// title: "${title}"
// coverImage: '/assets/blog/${slug}/cover.jpg'
// ---

// _Banner image courtesy of undraw.co_

// `,
//   function (err) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log(`${title} was created!`)
//   },
// )
