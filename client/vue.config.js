const { resolve } = require('path')

module.exports = {
  outputDir: resolve(__dirname, '../app/static'),
  publicPath: '/static',
  devServer: {
    writeToDisk: true
  }
}
