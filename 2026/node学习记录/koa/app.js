const Koa = require('koa')
const static = require('koa-static') // 静态资源服务
const path = require('path') // 路径模块
const app = new Koa() // 创建koa实例
const Router = require('koa-router') // 路由模块
const bodyparser = require('koa-bodyparser') // 解析POST请求体
app.use(bodyparser( 
    {
    // enableTypes:['json','form','text'], // 解析的请求体类型 默认解析json
    // jsonLimit:'100mb', // 解析json请求体的最大大小
    // formLimit:'100mb', // 解析form请求体的最大大小
    // textLimit:'100mb', // 解析text请求体的最大大小
    // multipart:true, // 解析multipart请求体
    // autoExtensions:true, // 自动添加文件扩展名
    // keepExtensions:true, // 保留文件扩展名
    // uploadDir:'./public/upload', // 上传文件的目录
    // encoding:'utf-8', // 编码
    // json:true, // 解析json请求体
    // form:true, // 解析form请求体
    // text:true, // 解析text请求体
    // xml:true, // 解析xml请求体
}
)) // 解析POST请求体



const router = new Router()


app.use(router.routes()).use(router.allowedMethods()) // 允许所有方法

// 获取get参数
router.get('/login',(ctx,next)=>{ // next 是koa的中间件 用于调用下一个中间件 洋葱模型
    // ctx.body = '登录页面'
    console.log('get登录请求进来')
    console.log(ctx.query.username)
    console.log(ctx.query.password)

    next()
    console.log('get登录请求进来2')
    ctx.body = 'get登录成功'
})

// 获取post参数
router.post('/login',(ctx,next)=>{
    // ctx.body = '登录页面'
    console.log(ctx.request.body)

    // ctx.body = ctx.request.body
    next()
})

// 动态路由
router.get('/:id',(ctx,next)=>{
    console.log('动态路由',ctx.params.id)
    // ctx.body = ctx.params.id
    ctx.body = '动态路由成功'
    next()
})




// 静态资源服务
// 静态资源服务的路径是 /public
// 相对路径是 public
// app.use(static('./public'))

// 静态资源绝对路径
app.use(static(path.join(__dirname,'public')))





app.listen(5000,()=>{
    console.log('5000端口成功运行')
})