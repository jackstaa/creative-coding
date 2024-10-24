let xspeed;
let yspeed;
let x = 0;
let y = 0;
let bounce = false;

function setup() {
  createCanvas(400, 400);
  let xspeed = random(-4,4);
  let yspeed = random(-4,4);
  circle(x, y, 50);
}

function draw(){
  background(220);
  // check for collision with left and right edge
  if (x < 25 | x > 375){
      xspeed = -xspeed;// reverse the x direction
      bounce = true;
  }
  if (y < 25 | y > 375){
      yspeed = -yspeed; // reverse the y direction
      bounce = true;
  }
  x = x + xspeed; // iterate x

  y = y + yspeed; // iterate y

  // draw a circle
  circle(x, y, 50);
  
}
