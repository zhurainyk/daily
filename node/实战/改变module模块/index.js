// Node.js 的 js 模块加载的流程是
//  load -> _extensions['.js'] -> _compile，可以通过修改 _extensions['.js'] 
// 来达到 hook 的目的，比如在 _compile 之前做一些代码转换。

const Module = require('module');
const fs = require('fs');

Module._extensions['.js'] = function (module, filename) {
    let content = fs.readFileSync(filename, 'utf8');
    if (filename.includes('input')) {
        content = content.replace('卡颂', '卡帅');
    }
    module._compile(content, filename);
};

const data = require('./module1.js');
console.log(data);