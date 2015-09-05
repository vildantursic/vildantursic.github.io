// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}

function between(min,max,float)
{
    if(float)
      return Math.random() * (max - min + 1) + min;
    else
      return Math.floor(Math.random()*(max-min+1)+min);
}

function hexToRgb(hex, opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "rgba("
        + parseInt(result[1], 16) +","
        + parseInt(result[2], 16) +","
        + parseInt(result[3], 16) + "," + opacity + ")"
     : null;
}

var canvas = document.getElementById("canvas");

// Initialize the context of the canvas
var ctx = canvas.getContext("2d");

// Set the canvas width and height to occupy full window
var W = window.innerWidth, 
    H = window.innerHeight;

canvas.width = W;
canvas.height = H;

var lineCount = 50,
    lineSpacing = 15,
    dotCount = 20,
	  dots = [],
    dotSpacing = 15,
    lines = [],
    colors = [ "#fff", "#75818F", "#808C9A", "#E4E9EE", "#f39c12", "#EC2772", "#57a3de", "#47AB62", "#00B0EC", "#EF6123", "#385A76", "#DA2723", "#4C8BEC", "#3B5999"];

function Line(positionY){
  this.dots = [];
  this.width = 600;
  this.height = 7;
  this.x = canvas.width + this.width;
  this.y = positionY;
  
  this.pushDot = function(){
      this.dots.push(new Dot(this.x - ( i * 15 ), positionY));
  }
  
  for(var i = 0; i < dotCount; i++){
    this.pushDot();
  }
  
  this.destroyDot = function(i){

      if(this.dots[i].x <= 10){
        this.dots.splice(i, 1);
        this.pushDot();
      }
  }
  
  this.drawDots = function(){
    for(var i=0; i<this.dots.length; i++){
      this.dots[i].draw();
    }
  }
  
  this.moveDots = function(){
    for(var i = 0; i < this.dots.length; i++){
      this.dots[i].move();
      this.destroyDot(i);
    }
  }
  
}

// Dot object which will inherit it's position from the parent line
function Dot(x, y) {

  this.width = between(8, 14);
  this.height = 7;
  this.opacity = between(0.01, 1, true);
	this.x = x;
	this.y = y;  
	this.vx = between(0.5,2,true);
  this.direction = "left";
  this.color = hexToRgb(
    colors[
      between(0,colors.length-1)], 
      between(0.01, 1, true));

}

Dot.prototype.draw = function(){
  
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fill();
  ctx.closePath();
  
}

Dot.prototype.move = function(){
  
  if(this.direction == "left")
      this.moveLeft();
  else if(this.direction == "right")
      this.moveRight();
}

Dot.prototype.moveLeft = function(){
  
  this.x += -this.vx;
    
  if(this.x <= this.vx)
    this.x += this.vx;
  
}

Dot.prototype.moveRight = function(){
  this.x += this.vx * 2;
}

// Create Lines
for(var i = 0; i < lineCount; i++){
    lines.push(new Line(i * lineSpacing + 10));
}

(function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < lines.length; i++){
      lines[i].drawDots();
      lines[i].moveDots(); 
    }
     
    requestAnimFrame(loop);
})();

  