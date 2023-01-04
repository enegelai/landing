const { fetchDocs } = require('./fetchDocs')

module.exports = {
  title: 'CX',
  description: 'AI Powered Continuous CX Testing on a Massive Scale',
  srcDir: '.',
  outDir: './dist',
  themeConfig: {
    repo: 'https://github.com/',
    pages: fetchDocs(),
    collections: {
      'Getting started': ['index'],
    },
  },
}
