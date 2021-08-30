console.show();
console.log("开始运行");

app.launchApp("抖音");

setTimeout(() => {
  console.log("开始评论");
  init();
}, 1500);
function init() {
  if (!text("点击进入直播间").exists()) {
    id("bgs").findOne().click();
    console.log("点击评论");
    setTimeout(() => {
      comment();
    }, 1500);
  }else{
    console.log('不评论')
    setTimeout(()=>{
      swiperDown()
    },1500)
  }
}

const commentsArr = [
  "有一回一，可能会迟到，但不拖欠，秒秒秒，可能会迟但不拖欠[比心]可能会迟到，但绝对不会缺席！",
  "诚信最重要[比心]会迟到[比心][比心]但不拖欠[比心][比心]互赞守信[比心]会迟到[比心][比心]但不拖欠[比心]宝宝们快来吧！",
  "互赞互赞[比心]",
  "互赞互赞[比心][比心]",
  "[看]诚实守信[比心][心]有一回一[比心][心]可会迟到[比心][心]但不缺席[比心][心]从不拖欠[比心][心]诚实守信[比心][心]有一回一[比心][心]顺便点个赞",
  "互赞，不是秒回，但是必回",
  "互赞互赞互赞[比心][比心][比心][玫瑰]",
  "大家都互赞[比心][玫瑰]",
  "快乐互赞，有赞必回[比心][比心]",
  "互赞互赞[比心][比心][玫瑰][玫瑰][玫瑰][玫瑰]",
  "诚实守信[比心]，从不欠[比心][比心][比心]可能会迟到，但是不会拖欠[玫瑰][玫瑰][玫瑰][666]诚实守信[比心]，从不欠[比心]",
];
const len = commentsArr.length;

function comment() {
  console.log("评论文字");
  let i = ~~(Math.random() * len);
  setText(commentsArr[i]);
  setTimeout(() => {
    addText();
  }, 1000);
}

function addText() {
  press(670, 1500, 200);
  console.log("评论成功");
  setTimeout(() => {
    closeComment();
  }, 1500);
}

function loveClick() {
  // id('jnl').findOne().click()
  press(150, 1500, 200);
  console.log("收藏点击成功");
  setTimeout(() => {
    const gifPosition = [
      [250, 1050],
      [450, 1050],
    ];
    addGif(450, 1050);
  }, 1500);
}

function addGif(x, y) {
  //210-330,984-1104
  press(x, y, 200);
  console.log("表情添加成功");
  setTimeout(() => {
    comform(680, 780);
  }, 1500);
}

function comform(x, y) {
  press(680, 780, 500); //632-712 744-824
  console.log("评论成功");
  setTimeout(() => {
    closeComment();
  }, 1500);
}

var i = 0;
function closeComment() {
  press(600, 200, 500);
  console.log("关闭评论成功");
  i++;
  console.log("第" + i + "次评论");
  setTimeout(() => {
    swiperDown();
  }, 2000);
}

function swiperDown() {
  swipe(100, 900, 200, 200, 500);
  console.log("下滑");
  setTimeout(() => {
    init();
  }, 2000);
}
