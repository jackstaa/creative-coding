let treeHeight = 50;
let bugX = 0;
let sunX, sunY;
let cloudX, cloud2X;

function setup() {
  createCanvas(800, 800);

  // Initial positions
  sunX = 100;
  sunY = 100;
  cloudX = 200;
  cloud2X = 600;
}

function draw() {
  // Background
  background(220);

  // Sky
  fill(135, 206, 235); // Sky color is blue
  rect(0, 0, width, height);

  // Sun
  drawSun();

  // Clouds
  drawClouds();

  // Tree
  drawTree();

  // Bug
  drawBug();

  // Update animations based on time
  updateTime();
}

function drawSun() {
  fill(255, 204, 0); // Yellow
  // Sun moves across the screen over 24 hours
  let sunX = map(hour(), 0, 23, 0, width); // Map hour to x-position
  ellipse(sunX, sunY, 60);
}

function drawClouds() {
  fill(255); // White
  // Cloud 1 moves across the screen every minute
  // Calculate the fraction of the current minute elapsed
  let mp = second() / 59; 
  cloudX = map(minute() + mp, 0, 60, 0, width); // Map the minute progress to screen width
  ellipse(cloudX, 50, 50);
  ellipse(cloudX + 35, 50, 65);
  ellipse(cloudX + 70, 50, 50);

  // Cloud 2 moves in the opposite direction
  cloud2X = map(minute() + mp, 0, 60, width, 0);
  ellipse(cloud2X, 80, 50);
  ellipse(cloud2X + 35, 80, 65);
  ellipse(cloud2X + 70, 80, 50);
}

function drawTree() {
  // Tree grows throughout the day
  let hoursElapsed = hour() + minute() / 60 + second() / 3600;
  treeHeight = map(hoursElapsed, 0, 24, 50, 500); // Tree height grows between 50 and 500 pixels

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
    height - treeHeight + 25,
    width / 2 + 50,
    height - treeHeight + 25,
    width / 2,
    height - treeHeight - 25
  );
  triangle(
    width / 2 - 50,
    height - treeHeight + 50,
    width / 2 + 50,
    height - treeHeight + 50,
    width / 2,
    height - treeHeight
  );
}

function drawBug() {
  // Bug moves across the screen every second
  bugX = map(second(), 0, 59, 0, width);
  fill(255, 0, 0); // Red
  ellipse(bugX, height - 10, 10);
}

function updateTime() {
  // Reset tree at midnight
  if (hour() === 0 && minute() === 0 && second() === 0) {
    treeHeight = 50;
  }
}
