console.show();
console.log("开始运行"+device.baseOS);

app.launchApp("抖音");

setTimeout(() => {
  console.log("开始点赞");

  init();
}, 1500);
var i = 0; // 点赞个数
var x = 0; //刷到直播次数
var all = 0; //刷视频总数
function init() {
  all++;
  if (text("点击进入直播间").exists()) {
    x++;
  } else {
    if (Math.random() > 0.4) {
      press(650, 880, 200);
      // press(964,1380,200)
      ++i;
    }
  }
  console.log("总数" + all + ";第" + i + "赞;" + "滑走" + x + "次");
  setTimeout(() => {
    swiperDown();
  }, 800);
}

function swiperDown() {
  // swipe(100, 900, 200, 200, 500);
  gestures([0,200,[500,1300],[500,100]])

  setTimeout(() => {
    init();
  }, 1000);
}
