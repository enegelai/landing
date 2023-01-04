const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { createMarkdownRenderer } = require('vitepress')
const { formatDate } = require('./theme/utils')
const md = createMarkdownRenderer(process.cwd())

const cache = new Map()

async function load(asFeed = false) {
  const postDir = path.resolve(__dirname, '../blog')
  const postsPromises = fs.readdirSync(postDir).map(async (file) => await getPost(file, postDir, asFeed))
  //.sort((a, b) => b.date.time - a.date.time) TODO ???
  const posts = await Promise.all(postsPromises)
  posts.sort((a, b) => b.date.time - a.date.time)
  return posts
}

async function getPost(file, postDir, asFeed = false) {
  const fullePath = path.join(postDir, file)
  const timestamp = fs.statSync(fullePath).mtimeMs

  const cached = cache.get(fullePath)
  if (cached && timestamp === cached.timestamp) {
    return cached.post
  }

  const src = fs.readFileSync(fullePath, 'utf-8')
  const { data, excerpt } = matter(src, { excerpt: true })

  const mmd = await md

  const post = {
    title: data.title,
    href: `/blog/${file.replace(/\.md$/, '.html')}`,
    date: formatDate(data.date),
    excerpt: mmd.render(excerpt),
  }
  if (asFeed) {
    // only attach these when building the RSS feed to avoid bloating the
    // client bundle size
    post.data = data
  }

  cache.set(fullePath, {
    timestamp,
    post,
  })
  return post
}

/*
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}*/

module.exports = {
  watch: '../blog/*.md',
  load: load,
}
