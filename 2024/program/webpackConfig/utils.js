'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isPro = process.env.NODE_ENV === 'production'

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions, anotherOption = {}) {
    let loaders = []
    if (loader) {
      loaders = [
        {
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: isPro
          }),
          ...anotherOption
        }
      ]
    }

    if (isPro) {
      let extractLoader = {
        loader: MiniCssExtractPlugin.loader
      }
      return [extractLoader, cssLoader].concat(['postcss-loader'], loaders)
    } else {
      return ['style-loader', cssLoader].concat(['postcss-loader'], loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', {
      lessOptions: {
        javascriptEnabled: true
      }
    }),
    sass: generateLoaders('sass', {
      sourceMap: isPro,
      additionalData:
        '@import "@/style/theme/global-vz.scss";@import "@/style/theme/index-vz.scss";'
    }),
    scss: generateLoaders('sass', {
      sourceMap: isPro,
      additionalData:
        '@import "@/style/theme/global-vz.scss";@import "@/style/theme/index-vz.scss";'
    }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
