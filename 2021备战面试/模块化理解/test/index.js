// import * as data from "./a.js"
// console.log(data)


const a = require('./a.js')
console.log(a.a)
console.log(a.b)
setTimeout(() => {    
    console.log(a.a)    
    console.log(a.b)
}, 500)


