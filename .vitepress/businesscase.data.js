const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { createMarkdownRenderer } = require('vitepress')
const { formatDate } = require('./theme/utils')
const md = createMarkdownRenderer(process.cwd())

const cache = new Map()

async function load(asFeed = false) {
  const postDir = path.resolve(__dirname, '../businesscase')
  console.log(`Reading business cases: ${postDir}`)
  const postFiles = fs.readdirSync(postDir)
  const postsPromises = []
  for (let i = 0; i < postFiles.length; i++) {
    const fn = postFiles[i]
    if (fn !== 'index.md') {
      postsPromises.push(getPost(postFiles[i], postDir, asFeed))
    }
  }
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
    href: `/businesscase/${file.replace(/\.md$/, '.html')}`,
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

module.exports = {
  watch: '../businesscase/*.md',
  load: load,
}
