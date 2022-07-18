const path = require('path')
module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        port: '1000',
        proxy: {
            '/api': {
                target: 'https://svip.bljiex.cc',
                changOrigin: true,
                pathWrite: {
                    '^/api': ''
                }
            },
            '/test': {
                target: 'https://svip.bljiex.cc',
                changOrigin: true,
                pathWrite: {
                    '^/test': ''
                }
            }
        }
    },
    // resolve: {
    //     modules: [path.resolve('node_modules'), 'node_modules']
    // }
}