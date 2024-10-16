const path = require('path')
var express = require('express')
const router = require('../apiRouter/nodeApi')
const compression = require('compression')
// const helmet = require("koa-helmet");
const config = require('../../config/index')
const favicon = require('serve-favicon')

module.exports = app => {
  app.use(compression())
  var staticPath = path.posix.join(config.build.assetsPublicPath)
  app.use('/', router)
  app.use(favicon(path.join(__dirname, '../../', 'favicon.ico')))

  app.use(staticPath, express.static('dist'))
}
