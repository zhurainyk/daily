#! /usr/bin/env node

console.log('zy-cli **** start ')
const path = require("path")
const fs = require('fs-extra') // 引入fs-extra
const program = require('commander')
const package = require('../package.json')
const inquirer = require('inquirer');
// 定义当前版本
program.version(`v${package.version}`)

//引入项目模板列表
const templates = require('./templates.js')
//下载功具
const downloadGitRepo = require('download-git-repo')

const ora = require('ora') // 引入ora

program.on('--help', () => {

})

// 解析用户执行命令传入参数
program.parse(process.argv)
program
    .command('create')
    .description('创建模版')
    .action(async () => {

        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: '请输入项目名称：'
        })
        console.log("项目名称：", { name })


        //选择模板
        const { template } = await inquirer.prompt({
            type: 'list',
            name: 'template',
            message: '请选择模版：',
            choices: templates // 模版列表
        })
        console.log('模版地址：', template)



        // 获取目标文件夹
        const dest = path.join(process.cwd(), name)
        console.log({ dest })
        // 判断文件夹是否存在，存在就交互询问用户是否覆盖
        if (fs.existsSync(dest)) {
            console.log('存在')

            const { force } = await inquirer.prompt({
                type: 'confirm',
                name: 'force',
                message: '是否覆盖'
            })
            // 如果覆盖就删除文件夹继续往下执行，否的话就退出进程
            console.log({force})
            // force ? () => {
            //     console.log('删除',force)
            //     fs.removeSync(dest)
            //     // 开心下载模版

            // } : process.exit(1)
            if(force){ 
                fs.remove(dest,{ recursive: true, force: true },function(x){
                    console.log('删除成功')
                    console.log(x)
                    const loading = ora('正在下载模版...')
                    // 开始loading
                    loading.start()
                    downloadGitRepo(template, dest, (err) => {
                        if (err) {
                            // console.log('创建模版失败', err)
                            loading.fail('创建模版失败：' + err.message) // 失败loading
                        } else {
                            // console.log('创建模版成功')
                            loading.succeed('创建模版成功!') // 成功loading
                        }
                    })
                })
                
            }else{
                
            }
       

        } else {
            console.log('不存在')
            // 定义loading
            const loading = ora('正在下载模版...')
            // 开始loading
            loading.start()
            downloadGitRepo(template, dest, (err) => {
                if (err) {
                    // console.log('创建模版失败', err)
                    loading.fail('创建模版失败：' + err.message) // 失败loading
                } else {
                    // console.log('创建模版成功')
                    loading.succeed('创建模版成功!') // 成功loading
                }
            })
        }





    });

program.parse(process.argv); 
