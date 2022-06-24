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
  xVel: 0,
  yVel: 0,
  maxSpeed: 8,
  width:20,
  height:20,
  renderDist: 275,
  defCol:"#FF0000",
  src:"",
  getKeys: function(){
    if (buttons[38] || buttons[87]) {
      this.yVel = -this.maxSpeed
    } else if (buttons[40] || buttons[83]) {
      this.yVel = this.maxSpeed
    } else {
      this.yVel *= 0.9
    }
    if (buttons[37] || buttons[65]) {
      this.xVel = -this.maxSpeed
    } else if (buttons[39] || buttons[68]) {
      this.xVel = this.maxSpeed
    } else {
      this.xVel *= 0.9;
    }
    this.xPos+=this.xVel
    this.yPos+=this.yVel
},
  render: function(){
    //console.log("rendering the player")
    if (!(this.src=="")){
      //console.log("nonblank src")
      let img = new Image();
      img.src = this.src;
      if (img.complete) {
        ctx.drawImage(
          img,
          (canvas.width / 2 - player.width / 2),
          (canvas.height / 2 - player.height / 2),
          this.width,
          this.height
        );
      }
    }else{
      //console.log("blank src")
      ctx.fillStyle=this.defCol
      ctx.fillRect(
        (canvas.width / 2 - player.width / 2),
        (canvas.height / 2 - player.height / 2),
        this.width,
        this.height
      );
      //console.log(Math.round(player.xPos), Math.round(player.yPos))
    }
  }
}
let entities = []
entities.push(new Entity(0,0,0,0,"#00FF00", 30, 30, ""))
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
      //console.log("rendering")
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
        //console.log("rendering entity, within dist, no src")
        //console.log(player.xPos)
      ctx.fillStyle=this.defCol
      ctx.fillRect(
      this.xPos - player.xPos + (canvas.width / 2 - player.width / 2),
      this.yPos - player.yPos + (canvas.height / 2 - player.height / 2),
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

function renderCycle(){
  canvas.width = canvas.width
  player.getKeys()
  entities.forEach(e=>e.render())
  player.render()
  window.requestAnimationFrame(renderCycle)
}
renderCycle()
//TODO:
//Figure out how to store setting and wall information
//https://www.w3schools.com/jsref/canvas_getimagedata.asp
