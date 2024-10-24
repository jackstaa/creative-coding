let xspeed;
let yspeed;
let x = 0;
let y = 0;
let bounce = false;

function setup() {
  createCanvas(400, 400);
  xspeed = random(-4,4);
  yspeed = random(-4,4);
  circle(x, y, 50);
}

function draw(){
  background(220);
  // check for collision with left and right edge
  if (x < 25 || x > 375){
      xspeed = -xspeed;// reverse the x direction
      bounce = true;
  }
  if (y < 25 || y > 375){
      yspeed = -yspeed; // reverse the y direction
      bounce = true;
  }
  x = x + xspeed; // iterate x

  y = y + yspeed; // iterate y

  const chars = ["a", "b", "c", "d", "e", "f"]; // Create array of letters
      let hex = "#"; // Initialize hex string

      // Generate hex color code
      for (let i = 0; i < 6; i++) { // Use 'i' for inner loop
        if (floor(random(15)) <= 9) {
          hex += floor(random(10)); // Append number 0-9
        } else {
          hex += random(chars); // Append character a-f
        }
      }
 
  // draw a circle
  if(bounce == true ){
  fill(hex);
  circle(x, y, 50);
  } else {
  circle(x, y, 50);
  }
  bounce = false;
  
}
