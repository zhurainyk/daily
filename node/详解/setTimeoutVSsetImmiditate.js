
//两个执行顺序是不确定的  可能setTimeout 先 执行 可能 setImmediate先执行
setTimeout(()=>{
    console.log('1')
},0)

setImmediate(()=>{
    console.log('2')
})






//但是在 IO回调里  setImmediate 会先执行  
const fs = require('fs')
const { nextTick } = require('process')

fs.readFile(__filename,()=>{
    setTimeout(()=>{
        console.log('setTimeout2')
    },0)

    setImmediate(()=>{
        console.log('setImmediate2')
    })
})




//微任务的执行顺序
Process.nextTick() 

Promise.then()

// nextTick先与then执行