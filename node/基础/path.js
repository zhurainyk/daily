/**
 * @path常用api
 * path.resolve() 接收任意个参数  返回 绝对路径+ 后面字参数拼接   path.resolve('a','b','c')=>  'E:\\前端训练营------------kkkkkkkkkkkkkkkkkkkk\\daily\\node\\基础\\a\\b\\c'
 * path.join() 接收任意个字符串参数 返回 参评的拼接   path.join('a','b','c') =>   'a\\b\\c'
 * path.extname()   传递一个文件名字 得到后缀 { extname1: '.js' } 如果传一个文件夹 得到的就是空
 * path.basename()  传入一个文件名字 得到整个文件的名字加类型 例子.js
 * @__dirname  返回文件夹的位置  'E:\\前端训练营------------kkkkkkkkkkkkkkkkkkkk\\daily\\node\\基础',
 * @__filename  返回文件绝对位置  'E:\\前端训练营------------kkkkkkkkkkkkkkkkkkkk\\daily\\node\\基础\\例子.js' 
 * 
 */



const path = require('path')
let pathName = path.resolve(__dirname)
let pathFileName = path.resolve(__filename)
console.log({pathName,pathFileName})

const pathJoin = path.join(__dirname,'./test.js')
console.log({pathJoin}) // 'E:\\前端训练营------------kkkkkkkkkkkkkkkkkkkk\\daily\\node\\基础\\test.js'

const pathResolve = path.resolve('a','b','c') //  'E:\\前端训练营------------kkkkkkkkkkkkkkkkkkkk\\daily\\node\\基础\\a\\b\\c'
const pathJointest = path.join('a','b','c')//  'a\\b\\c',
const pathJointest2 = path.join('a','b','..','c') // pathJointest2: 'a\\c'
console.log({pathResolve,pathJointest,pathJointest2})


const name1 = path.resolve(__dirname)
const extname1 = path.extname(name1)
console.log({extname1}) // { extname1: '.js' }

console.log(path.basename(__filename)) // 例子.js


