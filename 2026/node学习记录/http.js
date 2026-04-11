const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
const server = http.createServer((req, res) =>
{
    // res.end('hello http')
    // res.setHeader('Content-Type','text/plain;charset=utf-8');
    // res.end('不会用http吗？')
    const reqUrl = url.parse(req.url, true) // 解析query为对象
    console.log(reqUrl.pathname)
    res.setHeader('Content-Type','text/html;charset=utf-8');
    if(reqUrl.pathname === '/demo.html'){
        res.write('hello world')
        fs.readFile('./files/demo.html',(err,data)=>{
            if (err) {
                res.end('读取文件失败')
            } else {
                res.end(data)
            }
        })
    } else if (reqUrl.pathname === '/zhuyu' || reqUrl.pathname === '/'){
        fs.readFile('./files/zhuyu.html',(err,data)=>{
            if (err) {
                res.end('读取文件失败')
            } else {
                res.end(data)
            }
        })
    } else if(reqUrl.pathname === '/submit'){ // POST请求
       // 解析POST请求体 POST的数据是流，需要拼接起来才能解析
       console.log('POST请求进来')
        let postData = ''
        req.on('data',(chunk)=>{
            postData += chunk
        })

        req.on('end',()=>{
            console.log('POST请求体解析完成',postData)
            const postDataObj = qs.parse(postData)
            console.log(postDataObj)
            res.end('POST请求成功'+JSON.stringify(postDataObj,null,2))
        })
    }
    
     else {

        fs.readFile('./files/404.html',(err,data)=>{
            if (err) {
                res.end('读取文件失败2')
            } else {
                // res.write('404-----')
                data += '123'
                res.end(data)
            }
        })
    }

    // res.end('hello http')
})
server.listen(3000, () =>
{
    console.log('3000端口启动成功')
})
