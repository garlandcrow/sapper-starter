const tailwindcss = require('tailwindcss')
const PurgeSvelte = require('purgecss-from-svelte')

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.svelte'],
  extractors: [
    {
      extractor: PurgeSvelte.extract,
      extensions: ['svelte'],
    },
  ],
})

const cssnano = require('cssnano')({
  preset: [
    'default',
    {
      discardComments: {
        removeAll: true,
      },
    },
  ],
})

module.exports = {
  plugins: [
    require('autoprefixer'),
    tailwindcss('./tailwind.config.js'),

    ...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : []),
  ],
}
