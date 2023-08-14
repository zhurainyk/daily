# 创建cli
1. 新建文件夹 zy-cli
2. npm init -y
3. 在pakage.json中新增一个key="bin" 是一个对象 {"zy-cli":"./bin/cli.js"}
4. 新建一个bin文件 下面新建一个cli.js文件
5. cli.js 中随便console.log('xxx-cli') 然后在第一行输入 #! /usr/bin/env node
    >>> #! /usr/bin/env node: 该字段是必须的，触发wuyou-cli时告诉操作系统用node环境来执行cli.js文件

6. 运行 npm link 
7. cmd 运行 zy-cli 即可 看到刚刚的console.log

# 创建交互
1. npm i commander -S
2. 在cli.js中输入
    ```js
         #! /usr/bin/env node

        console.log('zy-cli **** start ')
        const program = require('commander')
        const package = require('../package.json')

        // 定义当前版本
        program.version(`v${package.version}`)

        // 解析用户执行命令传入参数
        program.parse(process.argv) 
    ```
# 处理创建模版命令
1. npm i inquirer@^8.2.5 -S
2. 在cli.js中添加
    ```js

    const program = require('commander');
    const inquirer = require('inquirer');
    const package = require("../package.json");
    // 定义当前版本
    program.version(**v${package.version}**);

    program
    .command('create')
    .description('创建模版')
    .action(async () => {
        const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: '请输入项目名称：'
        })
        console.log("项目名称：", name)
    });

    program.parse(process.argv); 
    /**
     * 以上代码使用了 commander 库来解析命令行参数，并定义了 create 命令。在 create 命令被调用时，会使用 inquirer 库与用户进行交互，获取用户输入的项目名称。
        以上代码中，我们使用了inquirer的input问题类型。根据不同的问题类型，需要提供不同的参数和答案类型，inquirer字段描述：

        type: 问题类型，可以是 input（输入框）、list（列表选择框）、confirm（二选一选择框）等
        name: 问题名称，用于标识答案对象中对应的属性名
        message: 问题描述，将会作为问题提示信息展示给用户
        choices: 选项列表，只有当问题类型为 list 时才需要提供 
     */
    ```

3. 运行 wuyou-cli create 即可输入自己的项目名字

# 实现选择项目模版并下载

1. 下载模版有两种方式： 
    把模版代码放在cli脚手架目录里面，然后把模版代码拷贝到用户目标目录中。
    把模版放在远程git上面，选择完模版从git远程拉取代码到用户目标目录中。

2. 在bin目录下新建templates.js文件，添加以下代码：
    ```js
    /** 暴露模版代码 */
        module.exports = [
        {
            name: 'webpack5-react-ts',
            value: 'https://github.com:guojiongwei/webpack5-react-ts'
        },
        {
            name: 'react18-vite2-ts',
            value: 'https://github.com:guojiongwei/react18-vite2-ts'
        },
        {
            name: 'dumi2-demo',
            value: 'https://github.com:guojiongwei/dumi2-demo'
        }
        ]
 
    ```
    >>> 注意模版地址部分，域名github.com和模版地址之间是用冒号:隔开的，不是斜杠/，这个是下一节下载git仓库代码模版所用到的库download-git-repo的规则。
        实际项目中要根据自己的需求配置不同的模版，比如gitlab，gitee等，文章后面也会换成接口动态请求。 

    >>> 支持gitee-2023-07-21补充
        下载gitee模版需要把路径设置为direct:https://gitee.com/xxx/xxx.git，然后使用下载模版工具downloadGitRepo时(下面会讲)，需要带上{ clone: true }参数
    ```js
         downloadGitRepo(projectTemplate, dest, { clone: true }, (err) => {})
    ```
3. 定义好模版后在bin/cli.js添加选择模版，选择模版是让用户选择列表，需要用inquirer库的list类型：
    ```js
        // ...
        const templates = require('./templates.js')

        program
        .command('create')
        .description('创建模版')
        .action(async () => {
            // ...省略 输入项目名称代码
        
            // 新增选择模版代码
            const { template } = await inquirer.prompt({
            type: 'list',
            name: 'template',
            message: '请选择模版：',
            choices: templates // 模版列表
            })
            console.log('模版：', template)
        });

        program.parse(process.argv);
        
        // ... 
        
    ```

4. 实现下载git项目模版的功能使用download-git-repo依赖来完成，安装依赖： npm i download-git-repo -S
    ```js

        const downloadGitRepo = require('download-git-repo')

        downloadGitRepo('项目git地址', '目标文件夹', function(err) {
            if (err) {
                console.log('下载失败', err)
            } else {
                console.log('下载成功')
            }
            })

        //默认会拉取master分支的代码，如果想从其他分支拉取代码，可以在git地址后面添加#branch选择分支。
 
    ```
5. 可以通过process.cwd()方法来获取用户执行命令行所在的目录位置，再加上用户输入的项目名称，所以目标文件夹路径应该为：

    ```js

    const path = require('path')

    // 目标文件夹 = 用户命令行所在目录 + 项目名称
    const dest = path.join(process.cwd(), name)
    ```

    ```js
        // 引入
        const path = require("path")
        const downloadGitRepo = require('download-git-repo')
        // ...

        // 获取目标文件夹
        const dest = path.join(process.cwd(), name)
        // 开心下载模版
        downloadGitRepo(template, dest, (err) => {
            if (err) {
                console.log('创建模版失败', err)
            } else {
                console.log('创建模版成功')
            }
        })
 
    ```
>>> 此时 脚手架搭建已经完成

# 优化cli脚手架
1.  优化下载模版时等待交互 我们可以添加一下命令行loading动画来提升用户体验。 npm i ora@^5.4.1 -S
```js
    const ora = require('ora') // 引入ora

    // 定义loading
    const loading = ora('正在下载模版...')
    // 开始loading
    loading.start()
    // 开始下载模版
    downloadGitRepo(template+, dest, (err) => {
    if (err) {
        loading.fail('创建模版失败：' + err.message) // 失败loading
    } else {
        loading.succeed('创建模版成功!') // 成功loading
    }
    })
 ```

 2. 支持从命令行传递参数
    ```js
        program
                .command('create [projectName]') // [projectName]是可选 <projectName>是必填
                .option('-t, --template', '模版名称') // 配置项 --template xxx
                .description('创建项目')
                .action(async (projectName, options) => {
                    // projectName: 项目名称
                    // options: 配置项 { template: string }
                })
  ```

3. 添加是否覆盖原文件夹 npm i fs-extra -S


 