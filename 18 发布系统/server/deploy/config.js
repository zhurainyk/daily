const server = {
  id: "server1", // 服务器配置id - 随意，目的是便于代码理解
  name: "express", // 当前项的配置名 - 随意，目的是对服务器配置的解释
  host: "127.0.0.1", // 服务器IP
  port: 8022, // 服务器端口，默认为22，一般情况下都是22
  username: "zhuyu", // 服务器登录名 - 登录xshell时的用户名
  password: "zhuyu123456", // 服务器登录密码 - 登录xshell时的密码
  path: "/home/zhuyu/server", // 文件上传到服务器的路径
};

module.exports = server;
