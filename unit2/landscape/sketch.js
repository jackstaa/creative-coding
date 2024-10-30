function setup() {
  createCanvas(800, 400);
  noLoop();
}

function draw() {
  // Draw the sky gradient
  drawSkyGradient();

  // Draw the mountain layers
  drawMountainLayers();
}

function drawSkyGradient() {
  let skyColorTop = color(random(200, 255), random(200, 255), random(255));
  let skyColorBottom = color(random(100, 200), random(150, 200), random(255));
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let col = lerpColor(skyColorTop, skyColorBottom, inter);
    stroke(col);
    line(0, y, width, y);
  }
}

function drawMountainLayers() {
  let layers = 4;  // mountain layers
  let layerHeight = height / layers;
  
  for (let i = 0; i < layers; i++) {
    let yOffset = height - i * layerHeight;
    let mountainColor = color(
      random(60, 160), // Red component
      random(60, 160), // Green component
      random(70, 180), // Blue component
      120               // Alpha
    );

    fill(mountainColor);
    noStroke();
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 20) {
      let offset = noise(x * 0.03, i * 0.2) * layerHeight;
      vertex(x, yOffset - offset);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}
