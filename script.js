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

function Entity(xPos, yPos, xVel, yVel, defCol, src){
  this.xPos = xPos
  this.yPos = yPos
  this.xVel = xVel
  this.yVel = yVel
  this.defCol = defCol
  this.src = src
  this.render = function(){

  }
}

function checkEntityDist(startX, startY, entX, entY, entWidth, entHeight){
  let farX = Math.max(Math.abs(startX-entX), Math.abs(startX-(entX+entWidth)))
  let farY = Math.max(Math.abs(startY-entY), Math.abs(startY-(entY+entHeight)))
  return(Math.max(farX, farY))
}
