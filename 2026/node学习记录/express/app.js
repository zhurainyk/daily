const express = require('express')
const ejs = require('ejs')




const fs = require('fs')
const app = express()
app.set('view engine','ejs')
const port = 3000
app.use(express.static('files'))
app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8');
    fs.readFile('./files/demo.html',(err,data)=>{
        if (err) {
            res.end('读取文件失败')
        } else {
            res.send(data)
        }
    })
})
app.get('/:num',(req,res)=>{
    const num = req.params.num
    // res.send(`你输入的数字是${num}`)
    let arr = []
    for(let i = 1;i<=num;i++){
        if(num%i === 0){
            arr.push(i)
        }
    }
    /**
     * ejs渲染模板 默认模板目录为views
     * @param {*} template 模板名称
     * @param {*} data 渲染数据
     */
    res.render('zhuyu',{num,arr})




})
app.listen(port,()=>{
    console.log('3000端口启动成功')
})