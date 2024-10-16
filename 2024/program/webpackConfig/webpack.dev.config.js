const { merge } = require('webpack-merge')

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpackConfig = require('./webpack.base.config')
const config = require('../config')

module.exports = merge(webpackConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem'
    // allowCollectingMemory: true,
  },
  //  devServer: {
  //   // host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
  //   port: config.dev.port, // 指定端口，默认是7000
  //   compress: true, // 是否启用 gzip 压缩
  //   open: true, // 打开默认浏览器
  //   hot: true, // 热更新
  //   historyApiFallback: true,
  //  },

  devServer: {
    port: config.dev.port, // 指定端口，默认是7000
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    historyApiFallback: {
      rewrites: [
        {
          from: /web/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        },
        {
          from: /servicereport/,
          to: path.posix.join(config.dev.assetsPublicPath, 'servicereport.html')
        }
        // {
        //  from: /test/,
        //  to: path.posix.join(config.dev.assetsPublicPath, 'test.html')
        // },
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['web']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.servicereport,
      template: 'servicereport.html',
      inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['servicereport']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
    new WebpackBar({
      profile: process.argv.includes('--profile')
    })
  ],
  optimization: {
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    runtimeChunk: {
      name: 'violet-manifest'
    },
    moduleIds: 'named',
    // extract vendor chunks for better caching
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 10,
          chunks: 'all'
        },
        element: {
          name: 'chunk-element', // 单独将 antd 拆包
          priority: 21, // 权重要大于 vendor  不然会被打包进 vendor 或者 app
          test: /[\\/]node_modules[\\/]element-plus[\\/]/
        },
        antd: {
          name: 'chunk-echarts', // 单独将 echarts 拆包
          priority: 20, // 权重要大于 vendor  不然会被打包进 vendor 或者 app
          test: /[\\/]node_modules[\\/]echarts[\\/]/
        }
      }
    }
  }
})
