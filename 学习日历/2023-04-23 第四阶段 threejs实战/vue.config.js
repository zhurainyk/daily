const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static',
  productionSourceMap: false,
  integrity: true,
  crossorigin: undefined,
})
