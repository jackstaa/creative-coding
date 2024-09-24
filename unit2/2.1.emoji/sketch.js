function setup() { 
  // create a canvas
  createCanvas(400, 400);

  noLoop();
}

function draw() {
  background(220);
  
  // Set up the center of the canvas
  rectMode(CENTER);
  
  // Draw the face using ellipse
  fill(255, 255, 0); // Yellow face
  stroke(0);
  strokeWeight(2);
  ellipse(200, 200, 200, 200); // Face
  
  // Draw the eyes using ellipse
  fill(0);
  noStroke();
  ellipse(160, 170, 20, 30); // Left eye
  ellipse(240, 170, 20, 30); // Right eye
  
  // Draw the mouth using line
  stroke(0);
  strokeWeight(5);
  line(160, 250, 240, 250);
  
  // Border around the emoji because u gotta use rect()
  stroke(0);
  fill(255, 255, 255, 0);
  rect(200, 200, 250, 250);
}
