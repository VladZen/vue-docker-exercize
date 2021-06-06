const { env } = require('process')
const { resolve } = require('path')

const isProductionMode = env.NODE_ENV === 'production'

const config = {
  publicPath: '/static/',
  devServer: {
    writeToDisk: true
  }
}

if (!isProductionMode) {
  config.outputDir = resolve(__dirname, '../app/static')
}

module.exports = config
