const fs = require('fs') // 引入fs模块
// console.log(fs)
// fs.readFile('./aa.txt','utf-8',(err,data)=>{ // 读取文件 ，异步操作 一般用异步操作 不用同步操作 因为同步操作会阻塞程序的执行
//     if(err){// 如果有错误
//         console.log(err)
//         return
//     }
//     console.log('异步读取到的数据是：',data)
// })

const data1 = fs.readFileSync('./aa.txt','utf-8') // 读取文件 ，同步操作 
// console.log('同步读取到的数据是：', data1)  // 读取到的数据是   字符串 

// fs.readFile('./files/1.html',(err,data)=>{ // 没有指定编码，返回的是Buffer类型的数据
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('html读取到的数据是：',data.toString()) // 读取到的数据是Buffer类型 因为html文件是二进制文件 ，所以需要使用toString()方法将其转换为字符串  
//    })

// fs.readFile('./files/0205-2.jpg',(err,data)=>{ // 没有指定编码，返回的是Buffer类型的数据
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('jpg读取到的数据是：',data.toString('base64')) // 图片是二进制文件 不能直接使用toString()方法将其转换为字符串 会乱码  所以需要使用base64编码将其转换为字符串
//    })
// 文件的分类  文本文件 二进制文件
// 文本文件  是由字符组成的文件，比如txt文件、html文件等
// 二进制文件  是由二进制数据组成的文件，比如图片文件、视频文件等
// 文本文件  可以直接使用toString()方法将其转换为字符串
// 二进制文件  不能直接使用toString()方法将其转换为字符串，需要使用base64编码将其转换为字符串
// base64编码  是一种将二进制数据转换为字符串的方法，比如将图片文件转换为base64编码的字符串
// base64编码  可以将二进制数据转换为字符串，但是字符串的长度会增加
// base64编码  可以将字符串转换为二进制数据，但是字符串的长度会减少

// fs.writeFile('./files/1.txt','hello world',(err)=>{ // 写入文件 ，同步操作
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('写入成功')
// }) // 写入文件 ，同步操作

// fs.readFile('./files/0205-2.jpg',(err,data)=>{ // 没有指定编码，返回的是Buffer类型的数据
//     if(err){
//         console.log(err)
//         return
//     }
//     // console.log('jpg读取到的数据是：',data.toString('base64')) // 图片是二进制文件 不能直接使用toString()方法将其转换为字符串 会乱码  所以需要使用base64编码将其转换为字符串
//     fs.writeFile('./files/0205-2-copy.jpg',data,(err)=>{ // 写入文件 ，异步操作
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log('写入图片成功')
//     }) // 写入文件 ，异步操作

//    })


// const buf = Buffer.from('hello world')
// console.log(buf)

// console.time('读取时间')
// const rs = fs.createReadStream('./files/0205-2.jpg')
// const ws = fs.createWriteStream('./files/0205-2-copy.jpg')
// rs.on('data',(chunk)=>{
//     console.log(chunk)
//     ws.write(chunk)

// })
// rs.on('end',()=>{
//     console.log('读取完成')
//     console.timeEnd('读取时间')
//     ws.end()
//     console.log('写入完成')
// })

// const rs = fs.createReadStream('./files/0205-2.jpg') // 读取文件 ，异步操作
// const ws = fs.createWriteStream('./files/0205-2-copy2.jpg') // 写入文件 ，异步操作// 一般用异步操作 不用同步操作 因为同步操作会阻塞程序的执行
// rs.pipe(ws)
// ws.on('finish',()=>{
//     console.log('写入完成')
// })


