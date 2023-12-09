const FtpDeploy = require('ftp-deploy')

const ftpServ = new FtpDeploy()
const ora = require('ora');
let config = {
  user: 'zhuyu', // 服务器登录账号
  password: 'zhuyu123456', // 服务器密码
  host: "127.0.0.1", // 服务器地址
  port: 8022, // ftp的接口
  localRoot: './dist/*',
  remoteRoot: '/home/zhuyu/service', // 远程路径
  include: ['*', '*/*','*/*/*'], // 包含文件
  exclude: ['dist/**/*.map'], // 排除文件
  deleteRemote: true,    // 上传前是否删除
  forcePasv: true // 主动模式/被动模式
}
console.log('----')
const spinner = ora('正在发布到server...' )
ftpServ
  .deploy(config).then(res => {
    console.log('自动化部署成功！\n')
    return false
  })
  .catch(err => {
    console.log(err)
    return false
  })