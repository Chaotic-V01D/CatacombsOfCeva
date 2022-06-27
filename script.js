const canvas = document.getElementById("gameSpace");
let canvasDimensions = Math.min(window.innerWidth - 30, window.innerHeight - 30);
canvasDimensions = 400
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
  xAcc: 0,
  yAcc: -0.1635,
  mass: 20,
  terminalVelocity: 12,
  maxSpeed: 8,
  width:20,
  height:20,
  renderDist: 275,
  defCol:"#FF0000",
  src:"",
  getKeys: function(){
    /*this.xVel+=this.xAcc
    this.yVel=Math.max(this.yVel+this.yAcc, -Math.abs(this.terminalVelocity))*/
    //Above section does othing unitl collision detection is completed
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
function Entity(xPos, yPos, xVel, yVel, xAcc, yAcc, mass, terminalVelocity, maxSpeed, defCol, width, height, src){
  this.xPos = xPos
  this.yPos = yPos
  this.xVel = xVel
  this.yVel = yVel
  this.xAcc = xAcc
  this.yAcc = yAcc
  this.mass = mass
  this.terminalVelocity = terminalVelocity
  this.maxSpeed = maxSpeed
  this.defCol = defCol
  this.width = width
  this.height = height
  this.src = src
  this.render = function(){
    this.xVel+=this.xAcc
    this.yVel=Math.max(this.yVel+this.yAcc, -Math.abs(this.terminalVelocity))
    this.xVel *= 0.9
    this.yVel *= 0.9
    this.xPos+=this.xVel
    this.yPos+=this.yVel
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
function checkPixelLine(startX, startY, dir, stepSize, range, image){
  //Okay, so this function is basically going to send out a ray
  //from a point and check for blank pixels along that ray
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let checkedPixels=[]
    const startX = 20
    const startY = 20
    const dir = 90
    for (var i=0;i<50;i++){
    	checkedPixels.push(imgData.data[canvas.width*(4*startY+(-i*4*stepSize*Math.sin(degToRad(dir))))+Math.min(canvas.width, 4*startX+(i*4*stepSize*Math.cos(degToRad(dir))))+3])
                              //(points[width*(startY+(-i*stepSize*Math.sin(degToRad(dir))))+Math.min(width, startX+(i*stepSize*Math.cos(degToRad(dir))))])
    	//checkedPixels.push(imgData.data[4*(startX+(i*Math.sin(degToRad(dir))))+3])
      //okay, so the way that the image data is stored is just in this big array
      //I need to access specific index of said array based on:
      //image width, pointX, pointY, and step length
      //shouldn't be too bad, but a problem for future me
      
      //6-27: I hate past me
      //6-27 + 36 minutes: I *really* hate past me
    }
  console.log(checkedPixels)
  };
}

function degToRad(value){
  return value * (Math.PI/180);
}

//https://pages.github.com/
/*function degToRad(val){
  return val * (Math.PI/180);
}
let points = []
for (var i=0;i<32;i++){
    points.push(i)
}
const width = 4
const height = points.length/width
const stepSize = 1
const dir = 360

let startX = 2
let startY = 4
for (var i=0;i<2;i++){
    console.log(points[width*(startY+(-i*stepSize*Math.sin(degToRad(dir))))+Math.min(width, startX+(i*stepSize*Math.cos(degToRad(dir))))])
}*/
