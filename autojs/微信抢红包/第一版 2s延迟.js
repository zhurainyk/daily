requestScreenCapture(false);
var redEnvelopes = id("auf");
var redEnvelopes_x = 0;
var redEnvelopes_y = 0;
console.show();

var redBox = 0;
var openTimes = 0;
while (true) {
  if (redEnvelopes.exists()) {
    redEnvelopes_point = id("auf").find();
    if (redEnvelopes_point.length > 0) {
      redEnvelopes_point.forEach((item, index) => {
        redEnvelopes_x = redEnvelopes_point[index]
          .bounds()
          .centerX();
        redEnvelopes_y = redEnvelopes_point[index]
          .bounds()
          .centerY();
        var img = captureScreen();
        var color = images.pixel(img, redEnvelopes_x, redEnvelopes_y);
        var point = findColor(img, "#FA9D3B", {
          region: [redEnvelopes_x, redEnvelopes_y, 50, 50],
          threshold: 4,
        });
        if (point) {
          toast("发现新红包！");
          click(redEnvelopes_x, redEnvelopes_y);
          sleep(400);
          openBox();
          sleep(1000);
        }
      });
    } else {
      //当前界面没有红包 不作任何处理
    }
  }
}

function openBox() {
  var draw = desc("开").findOne(500);
  if (draw != null) {
    log("#### 点开新红包");
    // log(draw.bounds)
    let bounds_ = draw.bounds();
    log(bounds_);
    let x = bounds_.centerX();
    let y = bounds_.centerY();
    click(x, y);
    redBox++;
    sleep(1000);
    console.log("成功抢红包" + redBox + "个");
    back();
  } else {
    log("过期之类无效红包");
  }
  back();
}
