app.launchApp('微信')

console.show()

sleep (500)
// let user = id('xxx').find()

// log(user)
desc('更多功能按钮').findOne().click()
sleep(1000)
sleep(10)
let arr = id ('dt5').findOne().children()
console.log( arr.length)
log('列表',id ('dt5').findOne())
let s = id ('dt5').findOne().children().forEach((item,index)=>{

    if(index ==2){
        item.parent().click()
    }
})

// s.click()
exit ()
// var name=text("王小婷").findOne();
// log(name);
// // 调用控件的id
// var id=name.id();
// log(id)
 
// 长按操作的实例演示，这里直接通过id方法进行的寻找
// var longclick=id("dgc").findOne();
// log(longclick);
// longclick.longClick();
 
// // 滚动操作的演示
// var scroll=className("ListView").findOne();
// log(scroll);
// // 控件向下，在api文档中，向上下左右都是可以的，这里仅仅滚动一次
// scroll.scrollDown();
 
// // 这里是拿子控件
// var scroll=className("ListView").findOne();
// var scroll_thing=scroll.children();
// log(scroll_thing);
// // 根据输出可以得到一共找到了两个控件
// scroll_thing.forEach((item,position)=>{
//     log(item);
//     log(position);
// });
 
// // 文本框，这里的className可以在层次布局中得到
// var text=className("EditText").findOne();
// log(text);
// // 这里调出来评论的信息，可以通过setText方法再输入文本
// text.setText("你好啊");
 
 
// // 输出当前页面所有的发表的名字
// var scroll=className("ListView").findOne();
// var scroll_thing=scroll.children();
// // log(scroll_thing);
// // 根据输出可以得到一共找到了两个控件
// scroll_thing.forEach((item,position)=>{
//     // log(item);
//     var name=item.findOne(id("dwf"));
//     // 找到所有孩子的信息之类的，通过id可以实现名字的查找
//     log(name.text());
// });
 
// // 点赞当前页面所有的
// var scroll=className("ListView").findOne();
// var scroll_thing=scroll.children();
// // log(scroll_thing);
// // 根据输出可以得到一共找到了两个控件
// scroll_thing.forEach((item,position)=>{
//     // log(item);
//     var pinglun=item.findOne(desc("评论"));
//     pinglun.click();
//     // 让程序不要一下子1运行那么快
//     sleep(1000);
// });
 
 
// // 多控件方法，寻找名字作为实例
// var scroll=className("ListView").findOne();
// var scroll_thing=scroll.children();
// // log(scroll_thing);
// // 根据输出可以得到一共找到了两个控件
// scroll_thing.forEach((item,position)=>{
//     // log(item);
//     var name=item.find(className("TextView"));
//     // log(name.size());
//     // name.forEach(name_contral=>{
//     //     log(name_contral);
//     // }
//     //)
//     // 第一个控件就是名字
//     log(name.get(0).text());
//     log("------------------------------")
// });
 
 
// 多控件方法，寻找名字作为实例
var scroll=className("ListView").findOne();
var scroll_thing=scroll.children();
// log(scroll_thing);
// 根据输出可以得到一共找到了两个控件
scroll_thing.forEach((item,position)=>{
    var comment = item.findOne(desc("评论"));
    if(comment){
        comment.click();
        sleep(1000)
        var zan = text("赞").findOne();
        if(zan){
            zan.click();
            slepp(1000);
        }
    }
});
 
gundong.scrollDown();