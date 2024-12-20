let xspeed;
let yspeed;
let x;
let y;
let bounce = false; //boolean to tell me if the ball has bounced or not

function setup() {
  createCanvas(400, 400);
  x = 200;
  y = 200;
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
  if(bounce == true ){ //if the ball hits the edge "bounces"
  fill(hex); //change to the new random color
  circle(x, y, 50);
  } else {
  circle(x, y, 50); //keep the old random color
  }
  bounce = false; //reset bounce to false
  
}
