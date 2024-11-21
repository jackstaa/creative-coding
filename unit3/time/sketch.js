let bugX = 0;
let treeHeight = 50;
let sunX = 100;
let sunY = 100;
let cloudX = 200;
let cloudY = 50;
let cloud2X = 600;
let cloud2Y = 80;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  // Background
  background(220);

  // Sky
  fill(135, 206, 235); // Sky blue
  rect(0, 0, width, height);

  // Sun
  fill(255, 204, 0); // Yellow
  ellipse(sunX, sunY, 60);

  // Clouds
  fill(255); // White
  ellipse(cloudX, cloudY, 50);
  ellipse(cloudX + 35, cloudY, 65);
  ellipse(cloudX + 70, cloudY, 50);
  ellipse(cloud2X, cloud2Y, 50);
  ellipse(cloud2X + 35, cloud2Y, 65);
  ellipse(cloud2X + 70, cloud2Y, 50);

  // Tree
  // Trunk
  fill(139, 69, 19); // Brown
  rect(width / 2 - 10, height - treeHeight, 20, treeHeight);

  // Leaves
  fill(34, 139, 34); // Green
  triangle(
    width / 2 - 50,
    height - treeHeight,
    width / 2 + 50,
    height - treeHeight,
    width / 2,
    height - treeHeight - 50
  );
    triangle(
    width / 2 - 50,
    height - treeHeight+25,
    width / 2 + 50,
    height - treeHeight+25,
    width / 2,
    height - treeHeight - 25
  );
      triangle(
    width / 2 - 50,
    height - treeHeight+50,
    width / 2 + 50,
    height - treeHeight+50,
    width / 2,
    height - treeHeight
  );

  // Bug
  fill(255, 0, 0); // Red
  ellipse(bugX, height - 10, 10);

  // Update animations
  updateTime();
}

function updateTime() {
  const now = new Date();

  // Bug moves every second
  bugX = (bugX + .05) % width;

  // Sun and clouds move every minute
  if (now.getSeconds() === 0) {
    sunX = (sunX + 4) % width;
    cloudX = (cloudX + 5) % width;
    cloud2X = (cloud2X + 6) % width;
  }

  // Tree grows every hour
  if (now.getSeconds() === 0) {
    treeHeight = Math.min(150, treeHeight + 50); // Limit tree height
  }

  // Tree resets at midnight
  if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
    treeHeight = 50; // Reset height
  }
}
