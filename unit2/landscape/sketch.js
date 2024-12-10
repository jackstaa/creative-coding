function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  // Draw the sky gradient
  drawSkyGradient();

  // Draw the mountain layers
  drawMountainLayers();
}

// function to draw the sky's gradient
function drawSkyGradient() {
  let skyColorTop = color(random(150, 255), random(150, 255), random(255)); //pick 2 random colors
  let skyColorBottom = color(random(100, 200), random(150, 200), random(255)); 
  for (let y = 0; y < height; y++) { //draw the gradient
    let inter = map(y, 0, height, 0, 1);
    let col = lerpColor(skyColorTop, skyColorBottom, inter); // fade the effect so the sky doesnt stand out too much from the mountains
    stroke(col);
    line(0, y, width, y);
  }
}

//adding the ground and other stuff to this function in the changes
function drawMountainLayers() {
  let layers = 4;  // mountain layers
  let layerHeight = 400 / 5;

  // function to draw the mountains
  // basically we want to choose a soft color but we want to have some variance as well
  // im going to take out the low end from each
  for (let i = 0; i < layers; i++) {
    let yOffset = height - i * layerHeight;
    let mountainColor, groundColor = color( //make groundColor same color as mountains
      random(20, 160), // Red
      random(5, 160), // Green
      random(30, 180), // Blue
      120              // Alpha
    );
    fill(mountainColor);
    noStroke();
    beginShape();
    vertex(200, height);
    for (let x = 0; x <= width; x += 20) {
      let offset = noise(x * 0.03, i * 0.2) * layerHeight;
      vertex(x, yOffset - offset);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}
