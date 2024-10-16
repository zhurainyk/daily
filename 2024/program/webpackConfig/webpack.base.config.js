const path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')
// const ElementPlus = require('unplugin-element-plus/webpack')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const config = require('../config')
const devConfig = require('../config/dev.env')
const devPro = require('../config/prod.env')
const utils = require('./utils')

const isProd = process.env.NODE_ENV === JSON.parse(config.build.env.NODE_ENV)
// const ScriptExtHtmlWebpackPlugin=require('script-ext-html-webpack-plugin')

const packageName = require('../package.json').name

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // entry: {
  //     index: ['./src/main.tsx']
  //   },
  entry: {
    web: './src/main.tsx',

    servicereport: './src/h5/main.js'
  },

  devtool: isProd ? false : 'cheap-module-source-map',
  output: {
    pathinfo: true,
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
    publicPath: isProd ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath,
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    globalObject: 'window'
  },
  resolve: {
    extensions: [
      '.js',
      '.tsx',
      '.json',
      '.less',
      '.png',
      '.css',
      '.scss',
      '.ts',
      '.vue',
      '.Vue'
    ],
    alias: {
      '@': resolve('src'),
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  module: {
    rules: [{
      test: /\.(vue|Vue)$/,
      include: [resolve('src')],

      use: [
        'thread-loader',
        {
          loader: 'vue-loader',
          options: {
            enableTsInTemplate: true,
            hotReload: !isProd
          }
        }
      ]
    },
    {
      test: /\.(jsx?|babel|js|es6|ts|tsx)$/,
      include: [resolve('src')],
      exclude: /(node_modules|bower_components)/,
      use: ['thread-loader', 'babel-loader?cacheDirectory']
    },
    ...utils.styleLoaders(),
    {
      test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024
        }
      },
      generator: {
        filename: utils.assetsPath('img/[name].[hash:7][ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: utils.assetsPath('media/[name].[hash:7][ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|TTF|otf)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: utils.assetsPath('fonts/[name][ext]')
      }
    }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: false
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //     'Promise': 'bluebird'
    // }),
    // AutoImport({
    //     resolvers: [ElementPlusResolver({
    //         importStyle:"sass"
    //     })],
    //   }),
    //   Components({
    //     resolvers: [ElementPlusResolver({
    //         importStyle:"sass"
    //     })],
    //   }),
    // ElementPlus({
    //     useSource: true,
    //   }),
    new webpack.DefinePlugin({
      process: isProd ? {
        env: devPro
      } : {
        env: devConfig
      },
      __VUE_PROD_DEVTOOLS__: !isProd,
      __VUE_OPTIONS_API__: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:7].css')
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSize: 30000, // 字节，分割点。默认：30720
      maxSize: 50000 // 字节，每个文件最大字节。默认：51200
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory
      }]
    })
  ]
}
