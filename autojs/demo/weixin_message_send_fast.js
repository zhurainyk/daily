console.show();
log("开始工作", "等待5秒");

let x = 3;

let timer = () => {
  x--;
  if (x == 0) return;
  console.log(x);

  setTimeout(() => {
    timer();
  }, 1000);
};
timer();

setTimeout(() => {
  log("等待结束");
  init();
  // press(350, 1530, 100);
  sendMsg();
  console.log("完毕");
}, 5000);

function init() {
  const width = device.width;
  const height = device.height;
  console.log("设置分辨率", width, height, "成功");
  setScreenMetrics(width, height);
}

var num = 1


function sendMsg() {
   setText('第'+ num + '条：今晚加班吗？')
   text("发送").findOne().click();
   num ++ 
   setTimeout(()=>{
       sendMsg()
   },50)
}
