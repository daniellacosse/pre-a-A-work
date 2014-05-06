function rightNow() {

  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']();
  } else {
    return +(new Date());
  }
  
}

function drawFrame(ctx, image, width, height, num) {

  var offsetX = 0,
    offsetY = num * height;

  ctx.drawImage(image, 
  offsetX, offsetY, 
  width, height, 
  0, 0, 
  width, height);

}

var fps          = 24,
    currentFrame = 0,
    totalFrames  = 29,
    img          = new Image(),
    canvas       = document.getElementById("canvas"),
    ctx          = canvas.getContext("2d"),
    currentTime  = rightNow();

    img.src = "../assets/theme/iso/loadSeq.png";

(function animloop(time){

  ctx.clearRect(0, 0, 128, 128);
  var delta = (time - currentTime) / 1000;

  currentFrame += (delta * fps);

  var frameNum = Math.floor(currentFrame);

  if (frameNum >= totalFrames) {
    currentFrame = frameNum = 0;
  }

  requestAnimationFrame(animloop);

  drawFrame(ctx, img, 128, 128, frameNum);
  currentTime = time;

})(currentTime);