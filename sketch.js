function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas size to match the window size
  noLoop(); // Prevent continuous drawing
}

function draw() {
    // Draw the sky gradient
  drawSkyGradient();

  // Draw the mountain layers
  drawMountainLayers();
  
  drawSun();
}

// Update canvas size when the window is resized
function windowResized() {
  resizeCanvas(1920, 1080);
}
// function to draw the sky's gradient
//pick 2 random colors
function drawSkyGradient() {
   let skyColorTop = color(random(180, 200), random(120), random(80)); // random, but warm color to radiate the sun's rays
  let skyColorBottom = color(random(50), random(100, 140), random(160,210)); //random, but cool, trying to emulate the mountains behind the sea
  for (let y = 0; y < height; y++) { //draw the gradient
    let inter = map(y, 0, height, 0, 1);
    let col = lerpColor(skyColorTop, skyColorBottom, inter); // fade the effect so the sky doesnt stand out too much from the mountains
    stroke(col);
    line(0, y, width, y);
  }
}

//adding the ground and other stuff to this function in the changes
function drawMountainLayers() {
  let layers = 6;  // mountain layers
  let layerHeight = 105;

  // function to draw the mountains
  // basically we want to choose a soft color but we want to have some variance as well
  // im going to take out the low end from each
  for (let i = 0; i < layers; i++) {
    let yOffset = height - 100-  i * layerHeight;
    let mountainColor = color(
      random(100, 130), // Red
      random(5, 50), // Green
      random(105, 155), // Blue
      90              // Alpha
    );
    fill(mountainColor);
    noStroke();
    beginShape();
    vertex(0, height-200);
    for (let x = 0; x <= width; x += 20) {
      let offset = noise(x * 0.03, i * 0.4) * layerHeight;
      vertex(x, yOffset - offset);
    }
    vertex(width, height-200);
    endShape(CLOSE);
  }
}

// new function to draw the sun
function drawSun() {
  // randomize sun position within the top of the canvas
  let sunX = random(100, width - 100);
  let sunY = random(50, height * 0.15);
  
  // sun layers for a cooler sun
  let sunColors = [
    color(245, 141, 86, 50),   // increase alpha
    color(245, 141, 86, 100),  // between indexes
    color(245, 141, 86, 150),  // of colors array
    color(245, 141, 86, 200)   // to make the sun look better
  ];
    // draw the sun with the array of sunColors
  for (let i = sunColors.length - 1; i >= 0; i--) {
    let radius = 50 - (i * 5);
    fill(sunColors[i]);
    noStroke();
    circle(sunX, sunY, radius * 2);
  }
}
