## nvm node包管理工具

>>> 下载地址 ：https://github.com/coreybutler/nvm-windows/releases 选择nvm-setup.ext下载
+ 安装之前先卸载所有的node版本
+ 安装弹出修改 第一步 C:\nvm\nvm
+ 第二步 C\nvm\nodejs
+ 安装完成 cmd 输入 nvm -v查看版本号 返回running version 版本号   即成功
+ 在 nvm 的安装路径下，找到 settings.txt，在后面加上这两行，设置国内镜像源：
```
    node_mirror: https://npm.taobao.org/mirrors/node/
    npm_mirror: https://npm.taobao.org/mirrors/npm/
```
+ 通过nvm安装node cmd输入   nvm install v16.15.0   nvm ls-remote   nvm uninstall v16.15.0
+ 查看已经安装的node版本 cmd  输入 nvm ls 
+ 使用node版本  cmd输入 nvm use v16.15.0  如果出现乱码 使用管理员cmd 
+ 环境变量配置 设置路径：此电脑->属性->高级程序设置->高级->环境变量
```
删除系统变量中的如下设置
    nvm变量：NVM_HOME和NVM_SYMLINK
    path：删除nvm自动添加的变量C:\nvm;C:\Program Files\nodejs
设置用户变量：
在node和npm不能使用时，可以手动添加node的环境变量C:\nvm\nodejs：
在系统变量中path添加nvm路径和nodejs路径，可以在全局中使用nodejs：
    C:\nvm\nodejs
    %NVM_HOME%
    %NVM_SYMLINK% 

```

+ 配置完成后 cmd输入 node -v   、 npm -v 即可
+ 设置nodejs prefix（全局）和cache（缓存）路径（非必须操作）
    >>> 在安装完nodejs后，通过npm下载全局模块默认安装到{%USERDATA%}C:\Users\username\AppData\下的Roaming\npm下
    >>> 在node.js安装路径下，新建node_global和node_cache两个文件夹: C:\nvm\nvm\v16.15.0\node_chache  ,C:\nvm\nvm\v16.15.0\node_global 
    >>> cmd输入 nvm on   ，nvm use 版本号 