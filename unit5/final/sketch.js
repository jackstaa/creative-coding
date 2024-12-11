let player;
let platforms;
let gameState;

function setup() {
  createCanvas(400, 600);
  
  // Initialize game state
  gameState = {
    isJumping: false,
    jumpPower: 0,
    maxJumpPower: 20
  };
  
  // Create player with horizontal movement
  player = {
    x: width / 2,
    y: height - 20,
    width: 20,
    height: 20,
    velocityY: 0,
    velocityX: 0,
    grounded: true,
    moveSpeed: 3
  };
  
  // Create platforms (increasing difficulty)
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
  
  // Handle horizontal movement
  handleMovement();
  
  // Draw platforms
  platforms.forEach(platform => {
    fill(platform.isGoal ? color(0, 255, 0) : color(100, 100, 100));
    rect(platform.x, platform.y, platform.width, platform.height);
  });
  
  // Physics and movement
  applyGravity();
  checkPlatformCollisions();
  
  // Draw player
  fill(255, 0, 0);
  rect(player.x, player.y, player.width, player.height);
  
  // Jump power indicator
  if (gameState.isJumping) {
    fill(0, 0, 255, 100);
    rect(10, height - 30, gameState.jumpPower * 5, 20);
  }
  
  // Check win condition
  checkWinCondition();
}

function handleMovement() {
  // Horizontal movement
  player.velocityX = 0;
  if (keyIsDown(LEFT_ARROW)) {
    player.velocityX = -player.moveSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.velocityX = player.moveSpeed;
  }
  
  // Update player position with horizontal movement
  player.x += player.velocityX;
}

function applyGravity() {
  player.velocityY += 0.5;
  player.y += player.velocityY;
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
      // Left collision
      if (
        player.x + player.width > platform.x &&
        player.x < platform.x &&
        player.velocityX > 0
      ) {
        player.x = platform.x - player.width;
      }
      
      // Right collision
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

function keyPressed() {
  // Start charging jump when spacebar is pressed
  if (key === ' ' && player.grounded) {
    gameState.isJumping = true;
    gameState.jumpPower = 0;
  }
}

function keyReleased() {
  // Execute jump when spacebar is released
  if (key === ' ' && player.grounded) {
    player.velocityY = -gameState.jumpPower;
    gameState.isJumping = false;
    gameState.jumpPower = 0;
  }
}

function keyTyping() {
  // Increment jump power while spacebar is held
  if (gameState.isJumping && gameState.jumpPower < gameState.maxJumpPower) {
    gameState.jumpPower += 0.5;
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
    text("YOU WIN!", width/2, height/2);
    noLoop(); // Stop the game
  }
}

function resetGame() {
  player.x = width / 2;
  player.y = height - 20;
  player.velocityY = 0;
  player.velocityX = 0;
}
