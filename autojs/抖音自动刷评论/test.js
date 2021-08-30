app.launchApp("抖音");

setTimeout(() => {
  init();
}, 2500);
function init() {
  id("be2").findOne().click();
  setTimeout(() => {
    comment();
  }, 1500);
}

function comment() {
  id("ekr").findOne().click();
  setTimeout(() => {
    loveClick();
  }, 1500);
}

function addText() {
  press(670, 1500, 200);
  setTimeout(() => {
    closeComment();
  }, 1500);
}

function loveClick() {
  press(150, 1500, 200);
  setTimeout(() => {
    const gifPosition = [
      [250, 1050],
      [450, 1050],
    ];
    addGif(450, 1050);
  }, 1500);
}

function addGif(x, y) {
  press(x, y, 200);
  setTimeout(() => {
    comform(680, 780);
  }, 1500);
}

function comform(x, y) {
  press(680, 780, 500);
  setTimeout(() => {
    closeComment();
  }, 1500);
}

 let i = 0;
function closeComment() {
  press(600, 200, 500);
  i++;
  setTimeout(() => {
    swiperDown();
  }, 2000);
}

function swiperDown() {
  swipe(100, 900, 200, 200, 500);
  setTimeout(() => {
    init();
  }, 2000);
}
