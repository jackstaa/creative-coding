function setup() {
  // Create canvas
  createCanvas(800, 800);

  // Disable animation
  noLoop();
}

// Function to draw a square at a random position on the canvas with the given color
function drawSquare(x, y, color) {
  noFill(); // No fill for the squares
  stroke(color.r, color.g, color.b, color.a); // Set stroke color with transparency
  strokeWeight(8); // Set stroke weight

  push(); // Save current drawing state
  translate(x, y); // Move to the random x, y position
  rect(0, 0, 100, 100); // Draw the square
  pop(); // Restore previous drawing state
}

// based on the following version of Walk Through Raster by Frieder Nake in 1966
// https://dam.org/museum/wp-content/uploads/2020/10/Nake1965WalkThroughRaster-3.jpg
// I wanted the black squares to stand out overtop of the pink so I ended up doing a set amount
// of each square to achieve a similar effect of the actual artwork
// because the black squares are clearly drawn overtop in this piece

function draw() {
  background("#FFFFFF");
  
  const pinkColor = { r: 245, g: 20, b: 160, a: 140 }; // Pink rgba
  const blackColor = { r: 0, g: 0, b: 0, a: 255 }; // Black rgba

// Draw 85 pink squares first
  for (let i = 0; i < 85; i++) {
    drawSquare(random(50, 600), random(50, 600), pinkColor); //use the function above to draw
  }
  // Draw 22 black squares
  for (let i = 0; i < 22; i++) {
    drawSquare(random(50, 600), random(50, 600), blackColor); //draw black second so it goes overtop of the pink
  }
}

// I played around with the values for a while and decided this would be a good number of each 
// square after testing different canvas sizes, square sizes, etc...
// I did think about how the squares have different weights for the horizontal and vertical lines that comprise them, however this is due pretty soon and I dont want to go that deep into things
