const path = require('path')
module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        port: '1000'
    },
    // resolve: {
    //     modules: [path.resolve('node_modules'), 'node_modules']
    // }
}