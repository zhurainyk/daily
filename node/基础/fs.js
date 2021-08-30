/**
 * fs.readFile(path,'utf-8',(err,result)=>{
 *  console.log(err,result)
 * })
 * 
 * 以下为在异步模式下打开文件的语法格式：
 * fs.open(path, flags[, mode], callback)
 *      path - 文件的路径。
        flags - 文件打开的行为。具体值详见下文。
        mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
        callback - 回调函数，带有两个参数如：callback(err, fd)。

 *
 * 
 */
const fs = require("fs");
const path = require("path");
const pathToFile = path.resolve(__dirname, "./test.txt");
console.log(pathToFile);

// fs.readFile(pathToFile,'utf-8',(err,result)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(result)
// })

// try {
//   const result = fs.readFileSync(pathToFile, "utf-8");
//   console.log(result);
// } catch (e) {
//   console.log(e);
// }

console.log(44);

//封装

// function promisefy(func){
//     return function(...args){
//         return new Promise((resolve,reject)=>{
//             args.push(function(err,result){
//                 if(err) return reject(err);
//                 return resolve(result)
//             })
//             return func.apply(func,args)
//         })
//     }
// }

// const readFile = promisefy(fs.readFile)
// readFile(pathToFile,'utf-8').then(res=>{
//     console.log(res)
// })


// const open = promisefy(fs.open)
// open(pathToFile,'r+').then(res=>{
//     console.log(res)
// })

fs.open(pathToFile,'r+',function(err,result){
    console.log(arguments)
})


//封装

function promisefy(func){
    return function(...args){
        return new Promise((resolve,reject)=>{
            args.push(function(err,result){
                if(err) return reject(err)
                return resolve(result)
            })
            return func.apply(func,args)
        })
    }
}

const readFile1 = promisefy(fs.readFile)
readFile1(pathToFile,'utf-8').then(res=>{
    console.log(res)
})
