const http = require('http')
const https = require('spdy')
const path = require('path')
const fs = require('fs')
var express = require('express')
const app = express()
const middleware = require('./middleware/nodeMiddleware')
const config = require('../config')
const sslOptions = {
  key: fs.readFileSync('./certificate/server.key'),
  cert: fs.readFileSync('./certificate/server.crt')
}
// app.use("*",function(req,res,next){
//   if(req.protocol=="http"){
//     let host = req.headers.host;
//     host = host.replace(/\:\d+$/, ''); // Remove port number
//     res.redirect(301,`https://${host}${req.path}`)
//   }else
//     next()
// })
const port = process.env.PORT || config.build.port
middleware(app)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/index.html'), {
    immutable: true
  })
})
console.log('> Starting dev server...')
var server = https.createServer(sslOptions, app)
server.listen(port)
http.createServer(app).listen(8009)
