function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
 
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
  var dataURL = canvas.toDataURL("image/"+ext);
  return dataURL;
}


var img = "https://img.alicdn.com/bao/uploaded/33.png"
var image = new Image();
image.crossOrigin = '';
image.src = img;
image.crossOrigin = 'anonymous'  
image.onload = function(){
  var base64 = getBase64Image(image);
  console.log(base64);
}