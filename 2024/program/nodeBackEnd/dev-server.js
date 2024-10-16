const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../config')
const port = config.dev.port
const webpackDevConfig = require('../webpackConfig/webpack.dev.config')
const chalk = require('chalk')
const logger = require('./logger')

const compiler = Webpack(webpackDevConfig)
const devServerOptions = {
  ...webpackDevConfig.devServer
}
const server = new WebpackDevServer(devServerOptions, compiler)
async function startServer() {
  try {
    server.listen(port, 'localhost', err => {
      if (err) {
        return logger.error(err.message)
      }
      return logger.start(port, 'localhost')
    })
  } catch (error) {
    console.log(chalk.red(error.message))
  }
}

startServer()
