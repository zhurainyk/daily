const vm = require('vm')
const path = require('path')
const fs = require('fs')
const pathToFile = path.resolve(__dirname,'..','./index.js')
const content = fs.readFileSync(pathToFile,'utf-8')

const wrapper = [
    '(function( require,module,exports){',

     '})'
]
const wrapperContent = wrapper[0] + content + wrapper[1]


const script = new vm.Script(content,{
    filename:'index.js'
})

const result  = script.runInThisContext()