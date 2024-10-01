function setup() {
  // create a canvas
  createCanvas(1200, 1200);

  // disable animation
  noLoop();
}

function draw() {
  translate(100,100);
  for (let x = 0; x < 8; x++){
   for (let y = 0; y < 8; y++){
      push();
      translate(x * 100, y * 100);
      ellipse(0,0,100,100);
      pop();
   }
}
  background(220);
}
