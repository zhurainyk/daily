## 0.4.7（2022-08-24）
- chore: 去掉 stylus
## 0.4.6（2022-08-24）
- feat: 增加 beforeDelay
## 0.4.5（2022-08-12）
- chore: 更新文档
## 0.4.4（2022-08-12）
- fix: 修复 resize 无参数时报错
## 0.4.3（2022-08-07）
# 评论有说本插件对新手不友好，让我做不好就不要发出来。 还有的说跟官网一样，发出来做什么，给我整无语了。
# 所以在此提醒一下准备要下载的你，如果你从未使用过 echarts 请不要下载 或 谨慎下载。
# 如果你确认要下载，麻烦看完文档。还有请注意插件是让echarts在uniapp能运行，API 配置请自行去官网查阅!
# 如果你不会echarts 但又需要图表，市场上有个很优秀的图表插件 uchart 你可以去使用这款插件，uchart的作者人很好，也热情。
# 每个人都有自己的本职工作，如果你能力强可以自行兼容，如果使用了他人的插件也麻烦尊重他人的成果和劳动时间。谢谢。
# 为了心情愉悦，本人已经使用插件屏蔽差评。
- chore: 更新文档
## 0.4.2（2022-07-20）
- feat: 增加 resize
## 0.4.1（2022-06-07）
- fix: 修复 canvasToTempFilePath 不生效问题
## 0.4.0（2022-06-04）
- chore 为了词云 增加一个canvas 标签
- 词云下载地址[echart-wordcloud](https://ext.dcloud.net.cn/plugin?id=8430)
## 0.3.9（2022-06-02）
- chore: 更新文档
- tips: lines 不支持 `trailLength`
## 0.3.8（2022-05-31）
- fix: 修复 因mouse事件冲突tooltip跳动问题
## 0.3.7（2022-05-26）
- chore: 更新文档
- chore: 设置默认宽高300px
- fix: 修复 vue3 微信小程序 拖影BUG
- chore: 支持PC
## 0.3.5（2022-04-28）
- chore: 更新使用方式
- 🔔 必须使用hbuilderx 3.4.8-alpha以上
## 0.3.4（2021-08-03）
- chore: 增加 setOption的参数值
## 0.3.3（2021-07-22）
- fix: 修复 径向渐变报错的问题
## 0.3.2（2021-07-09）
- chore: 统一命名规范，无须主动引入组件
## [代码示例站点1](https://limeui.qcoon.cn/#/echart-example)
## [代码示例站点2](http://liangei.gitee.io/limeui/#/echart-example)
## 0.3.1（2021-06-21）
- fix: 修复 app-nvue ios is-enable 无效的问题
## [代码示例站点1](https://limeui.qcoon.cn/#/echart-example)
## [代码示例站点2](http://liangei.gitee.io/limeui/#/echart-example)
## 0.3.0（2021-06-14）
- fix: 修复 头条系小程序 2d 报 JSON.stringify 的问题
- 目前 头条系小程序 2d 无法在开发工具上预览，划动图表页面无法滚动，axisLabel 字体颜色无法更改，建议使用非2d。
## 0.2.9（2021-06-06）
- fix: 修复 头条系小程序 2d 放大的BUG 
- 头条系小程序 2d 无法在开发工具上预览，也存在划动图表页面无法滚动的问题。
## [代码示例：http://liangei.gitee.io/limeui/#/echart-example](http://liangei.gitee.io/limeui/#/echart-example)
## 0.2.8（2021-05-19）
- fix: 修复 微信小程序 PC 显示过大的问题
## 0.2.7（2021-05-19）
- fix: 修复 微信小程序 PC 不显示问题
## [代码示例：http://liangei.gitee.io/limeui/#/echart-example](http://liangei.gitee.io/limeui/#/echart-example)
## 0.2.6（2021-05-14）
- feat: 支持 `image`
- feat: props 增加 `ec.clear`，更新时是否先删除图表样式 
- feat: props 增加 `isDisableScroll` ，触摸图表时是否禁止页面滚动
- feat: props 增加 `webviewStyles` ，webview 的样式, 仅nvue有效
## 0.2.5（2021-05-13）
- docs: 插件用到了css 预编译器 [stylus](https://ext.dcloud.net.cn/plugin?name=compile-stylus) 请安装它
## 0.2.4（2021-05-12）
- fix: 修复 百度平台 多个图表ctx 和 渐变色 bug
- ## [代码示例：http://liangei.gitee.io/limeui/#/echart-example](http://liangei.gitee.io/limeui/#/echart-example)
## 0.2.3（2021-05-10）
- feat: 增加 `canvasToTempFilePath` 方法，用于生成图片
```js
this.$refs.chart.canvasToTempFilePath({success: (res) => {
	console.log('tempFilePath:', res.tempFilePath)
}})
```
## 0.2.2（2021-05-10）
- feat: 增加 `dispose` 方法，用于销毁实例
- feat: 增加 `isClickable` 是否派发点击
- feat: 实验性的支持 `nvue` 使用要慎重考虑
- ## [代码示例：http://liangei.gitee.io/limeui/#/echart-example](http://liangei.gitee.io/limeui/#/echart-example)
## 0.2.1（2021-05-06）
- fix：修复 微信小程序 json 报错
- chore: `reset` 更改为 `setChart`
- feat: 增加 `isEnable` 开启初始化 启用这个后 无须再使用`init`方法
```html
<l-echart ref="chart" is-enable />
```
```js
// 显示加载
this.$refs.chart.showLoading()
// 使用实例回调
this.$refs.chart.setChart(chart => ...code)
// 直接设置图表配置
this.$refs.chart.setOption(data)
```
## 0.2.0（2021-05-05）
- fix：修复 头条 百度 偏移的问题
- docs: 更新文档
## [代码示例：http://liangei.gitee.io/limeui/#/echart-example](http://liangei.gitee.io/limeui/#/echart-example)
## 0.1.0（2021-05-02）
- chore:  第一次上传，基本全端兼容，使用方法与官网一致。
- 已知BUG：非2d 无法使用背景色，已反馈官方
- 已知BUG：头条 百度 有许些偏移
- 后期计划：兼容nvue
