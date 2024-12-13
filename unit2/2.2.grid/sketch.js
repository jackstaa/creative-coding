// function setup() {
//   // create a canvas
//   createCanvas(1200, 1200);
//   noLoop();
// }

// function draw() {
//   background(220); // Clear the canvas
//   translate(100, 100);

//   for (let x = 0; x < 8; x++) {
//     for (let y = 0; y < 8; y++) {
//       const chars = ["a", "b", "c", "d", "e", "f"]; // Create array of letters
//       let hex = "#"; // Initialize hex string

//       // Generate hex color code
//       for (let i = 0; i < 6; i++) { // Use 'i' for inner loop
//         if (floor(random(15)) <= 9) {
//           hex += floor(random(10)); // Append number 0-9
//         } else {
//           hex += random(chars); // Append character a-f
//         }
//       }

//       push();
//       translate(x * 100, y * 100); // Move the grid
//       fill(hex); // Set the fill color to the generated hex code
//       ellipse(0, 0, 100, 100); // Draw the circle
//       pop();
//     }
//   }
// }

// making a grid for all 16,777,216 rgb values
// Time complexity of O(N^3) LOL
// this will always take ages to load but maybe it will look cool who knows
function setup() {
   // create a canvas
   createCanvas(512, 512);
   noLoop();
 }
function draw() {
   background(220);
   const grid = 256;
   const x = 0;
   const y = 0;
   for (r = 0; r < 256; r++){
      for (g = 0; g < 256; g++){
         for (b = 0; b < 256; b++){
            x =  ((r*grid) + g) % width;
            y =  floor((r * grid + g) / width) * cell;
           fill(r, g, b);
           rect(x, y, 2, 2);
         }
      }
   }
}
