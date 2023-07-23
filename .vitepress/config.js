const { fetchDocs } = require('./fetchDocs')
const { createWriteStream } = require('node:fs')
const path = require('node:path')
const { SitemapStream } = require('sitemap')

const links = []

module.exports = {
  title: 'CX',
  description: 'AI Powered Continuous CX Testing on a Massive Scale',
  srcDir: '.',
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: './dist',
  markdown: {
    headers: {
      level: [2, 6],
    },
  },
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-9YYSL8KCZV',
      },
    ],
    ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-9YYSL8KCZV');"],
  ],
  themeConfig: {
    repo: 'https://github.com/',
    pages: fetchDocs(),
    collections: {
      'Getting started': ['index'],
    },
  },
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData.lastUpdated,
      })
  },
  // generates sitemap
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://www.enegel.ai/',
    })
    const writeStream = createWriteStream(path.resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  },
}
