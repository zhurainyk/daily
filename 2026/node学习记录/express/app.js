const express = require('express')
const ejs = require('ejs')
const routes = require('./routes')
const { port } = require('./config')

const app = express()

// 设置视图引擎
app.set('view engine', 'ejs')

// 静态文件服务
app.use(express.static('files'))

// 使用路由
app.use(routes)

// 启动服务器
app.listen(port, () => {
    console.log('3000端口启动成功')
})
