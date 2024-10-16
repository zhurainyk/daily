const { merge } = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('terser-webpack-plugin')
// const CopyWebpackPlugin = require("copy-webpack-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasure = require('speed-measure-webpack-plugin')
const webpackConfig = require('./webpack.base.config')

const smp = new SpeedMeasure()
var utils = require('./utils')
var config = require('../config/index')

const ConfigWebPack = merge(webpackConfig, {
  mode: 'production',
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
      }
    }),
    new BundleAnalyzerPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp(
        `\\.(${config.build.productionGzipExtensions.join('|')})$`
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({}),
      new UglifyJsPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] }
        }
      })
    ],
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    runtimeChunk: {
      name: 'violet-manifest'
    },
    moduleIds: 'deterministic',
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
module.exports = smp.wrap(ConfigWebPack)
