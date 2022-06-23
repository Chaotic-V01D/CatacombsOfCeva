const canvas = document.getElementById("gameSpace");
let canvasDimensions = Math.min(window.innerWidth - 30, window.innerHeight - 30);
canvas.width = canvasDimensions;
canvas.height = canvasDimensions;
var ctx = canvas.getContext("2d");

let buttons = [];
document.onkeydown = function (e) {
  e = e || window.event;
  buttons[e.keyCode] = true;
};
document.onkeyup = function (e) {
  e = e || window.event;
  buttons[e.keyCode] = false;
};
let player={
  xPos: 0,
  yPos:0,
  width:20,
  height:20,
  renderDist: 100,
  src:"",
  render: function(){

  }
}
function Entity(xPos, yPos, xVel, yVel, defCol, width, height, src){
  this.xPos = xPos
  this.yPos = yPos
  this.xVel = xVel
  this.yVel = yVel
  this.defCol = defCol
  this.width = width
  this.height = height
  this.src = src
  this.render = function(){
    if (checkEntityDist(player.xPos, player.yPos, this.xPos, this.yPos, this.width, this.height)<player.renderDist){
      if (!(this.src=="")){
    let img = new Image();
    img.src = this.src;
    if (img.complete) {
      ctx.drawImage(
        img,
        0 - player.x + (canvas.width / 2 - player.width / 2),
        0 - player.y + (canvas.height / 2 - player.height / 2),
        this.width,
        this.height
      );
    }
  }else{
    ctx.fillStyle=this.defCol
    ctx.fillRect(
      0 - player.x + (canvas.width / 2 - player.width / 2),
      0 - player.y + (canvas.height / 2 - player.height / 2),
      this.width,
      this.height
    );
  }
}
}
}

function checkEntityDist(startX, startY, entX, entY, entWidth, entHeight){
  let farX = Math.max(Math.abs(startX-entX), Math.abs(startX-(entX+entWidth)))
  let farY = Math.max(Math.abs(startY-entY), Math.abs(startY-(entY+entHeight)))
  return(Math.max(farX, farY))
}
