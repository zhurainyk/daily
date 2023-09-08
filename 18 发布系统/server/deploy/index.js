const scpClient = require('scp2');
// node模块 - node.js 命令行环境的 loading效果和显示各种状态的图标
const ora = require('ora');
// node模块 - node终端样式库
const chalk = require('chalk');
// import chalk from 'chalk'
// 服务器配置
const server = require('./config') //[( process.env.NODE_ENV === 'prod' ? 'prod' : 'dev')];
console.log(server)
// node 终端提示语，process.env：当前进程环境
const spinner = ora('正在发布到server...' ) //ora('正在发布到' + ( process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器...');

// loading
spinner.start();

// 执行scp2库，上传文件
// 第一个参数：要上传到服务器的文件
// 第二个参数：服务器配置
// 第三个参数：上传回调函数
scpClient.scp(
    '../*',
    {
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        path: server.path
    },
    function (err) {
        spinner.stop();
        if (err) {
            console.log(chalk.red('发布失败.\n'));
            throw err;
        } else {
            console.log(chalk.green('Success! 成功发布到服务器! \n'));
        }
    }
);