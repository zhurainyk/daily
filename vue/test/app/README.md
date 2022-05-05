## husky

前端提交代码前的校验

## npm-run-all

多个 npm 命令同时执行

serial 依次执行  
parallel 并发执行

#### 名称匹配

npm-run-all --parallel watch:\*
匹配分隔符，所有以 watch: 开头的脚本都会被运行。

#### 附带运行参数

npm-run-all build "start-server -- --port {1}" -- 8080

```js
   {
   "scripts": {
       "start": "npm-run-all build \"start-server -- --port {1}\" --"
   }
}
运行命令时只需：
npm run start 8080

可用的占位符包括：

{1}, {2}, ...
指定序号的单个参数
{@}
All arguments
{*}
All arguments as combined
```
