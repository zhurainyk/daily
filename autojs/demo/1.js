// log(222)
// sleep(2000)
// toast('你好')
// sleep(1000)
// alert('世界你好','欢迎来到aoto.js')
// console.show()
// console.info(device)
// let width = device.width;
// let height = device.height;
// console.info(width,height)
// // setScreenMetrics(width, height);
// let userInput = console.rawInput()
// log('用户输入了',userInput)
// sleep(1000)
// let result = dialogs.confirm('问题','你喜欢我吗');
// sleep(2000)
// log(result)

// console.show()
// log('开始运行')
// sleep(1000)
// app.launchApp('微信')
// sleep (1000)
// // app.launchApp('QQ')
// app.openUrl('https://www.baidu.com')

// sleep (2000)
// back()

let see_minute = rawInput('请输入观看视频分钟数', '120');
let timesInterval=5000;//养号多看一会
app.launchApp('抖音');
sleep(10000);
console.show(); //开启日志（悬浮窗权限）
douYinyoungWin();
douYinCloseFriendTip();
tongCheng();
let see_second = see_minute * 60;
let see_count =parseInt((see_second * 1000) / timesInterval) ;//分钟转换成秒再除以每次的时间间隔。
for (var i = 1; i < see_count; i++) {
    if(i==6){
        back();
        sleep(1000);
        if (className("android.widget.TextView").text("首页").exists()) {
            let b = className("android.widget.TextView").text("首页").findOnce().bounds();
            click(b.centerX(), b.centerY());
            toastLog("回到首页推荐页面.......");
        }
    }
    toastLog("抖音极速版滑动" + i + '次' + "总计:" + see_count + "次")
    randomFollow();
    randomHeart();
    slideScreenDown(device.width / 2, device.height - 400, device.width / 2, 300, 300,timesInterval);
}
home();//关闭当前程序
/**
 * 切换到同城
 */
function tongCheng() {
    if (className("android.widget.TextView").text("同城").exists()) {
        let b = className("android.widget.TextView").text("同城").findOnce().bounds();
        click(b.centerX(), b.centerY());
        sleep(3000);
        clickScreen();
    }
}
/**
 *点击一下屏幕
 */
function clickScreen() {
    var x = device.width - device.width * 0.2;
    var y = device.height - device.height * 0.2;
    toastLog("点击屏幕" + x + ":" + y);
    let clickResult = click(x, y);
    toastLog(clickResult);
}
/**
 * 关闭好友红包提示
 */
function douYinCloseFriendTip() {
    if (id("bap").exists()) {
        id("bap").findOnce().click();
    }
}
/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime,timesInterval) {
    swipe(startX, startY, endX, endY, pressTime);
    sleep(timesInterval);
}
/**如果弹出青少年窗口，点击 */
function douYinyoungWin() {
    if (youngWin = text("我知道了").exists()) {
        console.log("点击了我知道了(青少年窗口)");
        youngWin.click();
    };
}
/**
 * 随机上滑（防止被判定是机器）上滑后停留时间至少是10S，造成假象表示是对内容感兴趣
 * 点赞和关注先不搞。
 */
function randomUpSildeScreen() {
    let randomIndex = random(1, 40);
    if (randomIndex == 1) {
        console.log("随机上滑被执行了");
        pressTime = random(200, 500);
        swipe(device.width / 2, 500, device.width / 2, device.height - 200, 700);
        delayTime = random(10000, 15000);
        sleep(delayTime);
    }
}
/**
 * 连续下滑对上一个无兴趣
 * 其实得和上滑做个排他，既然无兴趣不要在上滑
 */
function randomDownSildeScreen() {
    let randomIndex = random(1, 50);
    if (randomIndex == 1) {
        console.log("连续下滑被执行了");
        swipe(device.width / 2, device.height - 200, device.width / 2, 500, 700);
        sleep(2000);
        swipe(device.width / 2, device.height - 200, device.width / 2, 500, 700);
        delayTime = random(8000, 10000);
        sleep(delayTime);
    }
}
/**随机点赞并休息一秒 */
function randomHeart() {
    index = random(1, 50);
    if (index == 6) {
        var target = id('a4l').findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
        }
    }
}
/**
 * 随机关注
 */
function randomFollow() {
    index = random(1, 100);
    if (index == 66) {
        var target = id('a4j').findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
        }
    }
 
}
function autoComment() {
    content = "666"
    id('px').findOnce().click();
    sleep(1000);//阻塞下面的动作
    // b = id('pz').findOnce().bounds();//获取评论按钮的rect
    // click(b.centerX(), b.centerY());
    setText(content);
    sleep(1000);
    click(b.centerX(), b.centerY());
    sleep(1000);
    click(device.width - 80, b.centerY());
}
FF