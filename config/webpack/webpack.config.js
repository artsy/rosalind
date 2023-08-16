// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { webpackConfig, merge } = require('shakapacker')

const customConfig = {
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.sass',
      '.scss',
      '.css',
      '.module.sass',
      '.module.scss',
      '.module.css',
      '.png',
      '.svg',
      '.gif',
      '.jpeg',
      '.jpg',
    ],
  },
}

module.exports = merge(webpackConfig, customConfig)
