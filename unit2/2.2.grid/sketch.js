function setup() {
  // create a canvas
  createCanvas(1200, 1200);
  draw();
  noLoop();
}
function draw() {
  translate(100,100);
  for (let x = 0; x < 8; x++){
   for (let y = 0; y < 8; y++){
     const char = ["a","b","c","d","e","f"]; //create array of letters
      let hex = "#"; // empty string
      for (let x = 0; x < 6; x++) { // simple code to randomly generate a number between 0-14 i.e. hexadecimal
        if (Math.floor(Math.random()*15 )<= 9) { // if 0-9 use numbers 0-9
          hex = hex + floor(random(10));
        } else{ // if 10-14 use random char a-f
          hex = hex + random(char);
        }
      }
      push();
      translate(x * 100, y * 100);
      ellipse(0,0,100,100);
      fill(hex); // fill circle with hex code as color
      pop();
   }
}
  background(220);
}
