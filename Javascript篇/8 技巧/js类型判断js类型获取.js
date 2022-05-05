const type = (obj)=>Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()

const log = type({})
console.log(log)