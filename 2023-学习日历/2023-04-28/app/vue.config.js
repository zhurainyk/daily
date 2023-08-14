const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',   // ip 本地
    open: true,          // 配置自动启动浏览器
    port: 3000           // 设置端口号
  },
  lintOnSave: false, // 关闭eslint

  assetsDir: 'static',
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     .set('assets', resolve('src/assets'))
  //     .set('components', resolve('src/components'))
  // },
  // configureWebpack: (config) => {  
  //   if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
  //     config.mode = 'production';
  //     config["performance"] = {//打包文件大小配置
  //       "maxEntrypointSize": 10000000,
  //       "maxAssetSize": 30000000
  //     }
  //   }
  // }
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin(
        {
          patterns: [
            { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml' },
            { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf' },
            { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/' }
          ]
        }


      )
    ],

  }
})
