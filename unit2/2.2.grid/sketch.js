function setup() {
  // create a canvas
  createCanvas(1200, 1200);
  noLoop();
}

function draw() {
  background(220); // Clear the canvas
  translate(100, 100);

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
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

      push();
      translate(x * 100, y * 100); // Move the grid
      fill(hex); // Set the fill color to the generated hex code
      ellipse(0, 0, 100, 100); // Draw the circle
      pop();
    }
  }
}
