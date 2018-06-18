const path = require('path')

const topLevelStyledComponents = path.resolve(
  __dirname,
  '../..',
  'node_modules',
  'styled-components'
)

module.exports = {
  resolve: {
    alias: {
      'styled-components': topLevelStyledComponents
    }
  }
}
