let player;
let platforms;
let gameState;
let dragStart = null;

function setup() {
  let canvas = createCanvas(400, 600);
  canvas.parent('sketch-holder');

  // Initialize game state
  gameState = {
    isDragging: false,
  };

  // Create player
  player = {
    x: width / 2,
    y: height - 20,
    width: 20,
    height: 20,
    velocityX: 0,
    velocityY: 0,
    grounded: true,
    moveSpeed: 3
  };

  // Create platforms
  platforms = [
    { x: width / 2 - 100, y: height - 50, width: 200, height: 10 },
    { x: width / 2 - 80, y: height - 150, width: 160, height: 10 },
    { x: width / 2 - 60, y: height - 250, width: 120, height: 10 },
    { x: width / 2 - 40, y: height - 350, width: 80, height: 10 },
    { x: width / 2 - 20, y: height - 450, width: 40, height: 10 },
    { x: width / 2, y: 50, width: 20, height: 10, isGoal: true }
  ];
}

function draw() {
  background(220);

  // Draw platforms
  platforms.forEach(platform => {
    fill(platform.isGoal ? color(0, 255, 0) : color(100, 100, 100));
    rect(platform.x, platform.y, platform.width, platform.height);
  });

  // Apply physics
  applyGravity();
  checkPlatformCollisions();

  // Draw player
  fill(255, 0, 0);
  rect(player.x, player.y, player.width, player.height);

  // Draw drag line if dragging
  if (gameState.isDragging && dragStart) {
    stroke(0, 0, 255);
    line(dragStart.x, dragStart.y, mouseX, mouseY);
  }

  // Check win condition
  checkWinCondition();
}

function applyGravity() {
  player.velocityY += 0.5;
  player.y += player.velocityY;
  player.x += player.velocityX;
}

function mousePressed() {
  // Start dragging if player is grounded
  if (player.grounded) {
    gameState.isDragging = true;
    dragStart = { x: mouseX, y: mouseY };
  }
}

function mouseReleased() {
  if (gameState.isDragging && dragStart) {
    // Calculate jump trajectory
    let dragEnd = { x: mouseX, y: mouseY };
    let dragVector = {
      x: dragEnd.x - dragStart.x,
      y: dragEnd.y - dragStart.y
    };

    // Set player velocity (scaled by a factor for gameplay tuning)
    player.velocityX = -dragVector.x * 0.1;
    player.velocityY = -dragVector.y * 0.1;
    player.grounded = false;
    gameState.isDragging = false;
    dragStart = null;
  }
}

function checkPlatformCollisions() {
  let wasGrounded = player.grounded;
  player.grounded = false;

  platforms.forEach(platform => {
    // Horizontal collision
    if (
      player.y + player.height > platform.y &&
      player.y < platform.y + platform.height
    ) {
      if (
        player.x + player.width > platform.x &&
        player.x < platform.x &&
        player.velocityX > 0
      ) {
        player.x = platform.x - player.width;
      }
      if (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x + platform.width &&
        player.velocityX < 0
      ) {
        player.x = platform.x + platform.width;
      }
    }

    // Vertical collision (landing on platform)
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height >= platform.y &&
      player.y + player.height <= platform.y + 10 &&
      player.velocityY > 0
    ) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
    }

    // Prevent falling through platform from above
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y &&
      player.velocityY < 0
    ) {
      player.y = platform.y + platform.height;
      player.velocityY = 0;
    }
  });

  // Bottom of screen boundary
  if (player.y + player.height > height) {
    resetGame();
  }
}

function checkWinCondition() {
  const goalPlatform = platforms.find(p => p.isGoal);
  if (
    player.x < goalPlatform.x + goalPlatform.width &&
    player.x + player.width > goalPlatform.x &&
    player.y < goalPlatform.y + goalPlatform.height &&
    player.y + player.height > goalPlatform.y
  ) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2);
    noLoop();
  }
}

function resetGame() {
  player.x = width / 2;
  player.y = height - 20;
  player.velocityY = 0;
  player.velocityX = 0;
}
