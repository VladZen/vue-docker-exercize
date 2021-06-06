const { env } = require('process')
const { resolve } = require('path')

const isProductionMode = env.NODE_ENV === 'production'

const config = {
  publicPath: '/static/',
  devServer: {
    writeToDisk: true
  },
  chainWebpack (config) {
    // Dealing with scss variables auto add
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))

    function addStyleResource (rule) {
      rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            resolve(__dirname, './src/assets/scss/_variables.scss'),
          ],
        })
    }
  }
}

if (!isProductionMode) {
  config.outputDir = resolve(__dirname, '../app/static')
}

module.exports = config
