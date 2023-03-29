1. npm init -y 
2. 安装 parcel打包工具  npm install -g parcel-bundler 不建议全局安装 去掉-g [parcel工具官网](https://www.parceljs.cn/getting_started.html)
3. 更改package.json中的命令
```javascript 
 "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  }

```
4. 在根目录下新建一个src目录 下面新建index.html 
5. npm i three 安装threejs 
6. 新建一个main.js 并引入到index.html中  type=module
7. npm run dev 即可
8. 视频学习threejs在哔站  [threejs学习地址](https://www.bilibili.com/video/BV1Gg411X7FY/?p=4&spm_id_from=pageDriver&vd_source=ec3b7218ddc819b2281c36da8b9b6578)
