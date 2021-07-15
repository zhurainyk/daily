console.show();
log("开始运行");
sleep(500);
app.launchApp("抖音");
log("运行抖音成功");

let width = device.width;
let height = device.height;
setScreenMetrics(width, height);
let times
log("设置分辨率成功");
init()
sleep(2000);
log("开始滑动");
for (let i = 0; i < times; i++) {
  swipe(600, 900, 100, 300, 500);
  console.info("滑动次数：", i + 1);

  sleep(5000);

  press(702, 860, 200);
  console.error("点赞成功：", i + 1);
  sleep(2000);
}

function init() {
   times = console.rawInput('请输入点赞的数量',10); //用户输入框

  if (isNaN(times)) {
    console.error("请输入数字");
    init();
  } else {
    log("接下来将点赞" + times + "次");
  }
}
