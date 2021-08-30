console.log(this) //直接输出this  =>   {}



module.exports.foo = 5


console.log(this) //输出 {foo:5}

module.exports.xxx=()=>{
    console.log(222)
}

console.log(this)  //{ foo: 5, xxx: [Function] }
