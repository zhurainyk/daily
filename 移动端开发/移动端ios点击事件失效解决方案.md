### 记一次移动端点击事件失效
>>> 正常来讲 pc端 安卓端都能使用  唯独ios无法生效
>>> 解决方案： fastclick.js 
```js
//使用方法
<script script='fastclick.js'></script>
mounted(){
      $(function () {
         FastClick.attach(document.body);
      });
}
```