```js
tooltip ={                                      //提示框组件
    trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
    triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
    showContent:true,                           //是否显示提示框浮层
    alwaysShowContent:true,                     //是否永远显示提示框内容
    showDelay:0,                                  //浮层显示的延迟，单位为 ms
    hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
    enterable:false,                             //鼠标是否可进入提示框浮层中
    confine:false,                               //是否将 tooltip 框限制在图表的区域内
    transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
    position:['50%', '50%'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
    formatter:"{b0}: {c0}<br />{b1}: {c1}",     //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
    backgroundColor:"transparent",            //标题背景色
    borderColor:"#ccc",                        //边框颜色
    borderWidth:0,                              //边框线宽
    padding:5,                                  //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
    textStyle:mytextStyle,                     //文本样式
};

title={
	show:"true",//是否显示标题，默认显示，可以不设置
	text:"echarts实例",//图表标题文本内容
	link:"http://echarts.baidu.com/",//点击标题内容要跳转的链接
	target:"blank",//跳转链接打开方式，blank是新窗口打开，self是自身窗口打开，跟a标签一样
	textStyle:{//标题内容的样式
		color:'#e4393c',//京东红
		fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
		fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
		fontFamily:"san-serif",//主题文字字体，默认微软雅黑
		fontSize:18//主题文字字体大小，默认为18px
	},
	textAlign:'left',//标题文本水平对齐方式，建议不要设置，就让他默认，想居中显示的话，建议往下看
	textBaseline:"top",//默认就好,垂直对齐方式,不要设置
	subtext:"作者:前端林三哥",//主标题的副标题文本内容，如果需要副标题就配置这一项
	sublink:"http://blog.csdn.net/zhaoxiang66",//点击副标题内容要跳转的链接
	subtarget:"blank",//同主标题，blank是新窗口打开，self是自身窗口打开
	subtextStyle:{//副标题内容的样式
		color:'green',//绿色
		fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
		fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
		fontFamily:"san-serif",//主题文字字体，默认微软雅黑
		fontSize:12//主题文字字体大小，默认为12px
	},
	padding:5,//各个方向的内边距，默认是5，可以自行设置
	itemGap:10,//主标题和副标题之间的距离，可自行设置
	left:"center",//left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
	top:"center",//left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
	right:"auto",//right 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
	bottom:"auto",//bottom 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
	//left设置center标题会自动水平居中
	//top设置center标题会自动垂直居中
	backgroundColor:"#ccc",//标题背景色，默认透明，颜色可以使用 RGB 表示，比如 'rgb(128, 128, 128)' ，如果想要加上 alpha 通道，可以使用 RGBA，比如 'rgba(128, 128, 128, 0.5)'，也可以使用十六进制格式，比如 '#ccc'
	borderColor:"red",//标题的边框颜色，颜色格式支持同backgroundColor
	borderWidth:2,//标题边框线宽，默认为0，可自行设置
	shadowBlur: 10,//图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
	shadowColor: "black",
	shadowOffsetX: 0,
	shadowOffsetY: 0,
}
 
 
```
