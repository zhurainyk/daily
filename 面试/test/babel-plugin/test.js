const {transformSync} = require('@babel/core')

const myPlugin = require('./index.js') 
//可以使用插件了

const code = `
    console.log('click');
    if(DEBUG){
        const a = 10;
        const b = 20;
        console.log(a+b)
    }
    console.log('end')
`
const babelConfig = {
    plugins:[
        ['./index.js',{//包裹一层中括号 第二个参数是config
            isRemove:true  //传递参数
        }]
    ]
}

const outPut = transformSync(code,babelConfig)

console.log(outPut.code)