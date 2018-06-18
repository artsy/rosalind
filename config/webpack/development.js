process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

const customModuleResolutionConfig = require('./module-resolution.js')
environment.config.merge(customModuleResolutionConfig)

module.exports = environment.toWebpackConfig()
