const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static',
  productionSourceMap: false,
  // 开发模式禁用 SRI，避免哈希校验失败导致空白页
  integrity: false,
})
