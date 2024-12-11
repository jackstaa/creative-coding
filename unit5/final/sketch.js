let player;
let platforms;
let gameState;
let resetButton;

function setup() {
  let canvas = createCanvas(400, 600);
  canvas.parent('sketch-holder');
  
  // Create reset button
  resetButton = createButton('Reset Game');
  resetButton.position(10, height + 10);
  resetButton.mousePressed(resetGame);
  
  initializeGame();
}

function initializeGame() {
  // Initialize game state
  gameState = {
    isJumping: false,
    jumpPower: 0,
    maxJumpPower: 20,
    jumpDirection: null,
    gameOver: false
  };
  
  // Create player with precise positioning
  player = {
    x: width / 2,
    y: height - 50,
    width: 20,
    height: 20,
    velocityY: 0,
    velocityX: 0,
    grounded: true,
  };
  
  // Create platforms (increasing difficulty)
  platforms = [
    { x: width, y: height - 50, width: 80, height: 10 },
    { x: 0, y: height - 50, width: 80, height: 10 },
    { x: width / 2 - 80, y: height - 150, width: 160, height: 10 },
    { x: width / 2 - 60, y: height - 250, width: 120, height: 10 },
    { x: width / 2 - 40, y: height - 350, width: 80, height: 10 },
    { x: width / 2 - 20, y: height - 450, width: 40, height: 10 },
    { x: width / 2, y: 50, width: 20, height: 10, isGoal: true }
  ];
}

function draw() {
  background(220);
  
  // Debug key presses
  displayKeyPresses();
  
  // Draw platforms
  platforms.forEach(platform => {
    fill(platform.isGoal ? color(0, 255, 0) : color(100, 100, 100));
    rect(platform.x, platform.y, platform.width, platform.height);
  });
  
  // Physics and movement
  applyGravity();
  checkPlatformCollisions();
  checkWallCollisions();
  
  // Draw player
  fill(255, 0, 0);
  rect(player.x, player.y, player.width, player.height);
  
  // Jump power indicator
  if (gameState.isJumping) {
    fill(0, 0, 255, 100);
    rect(10, height - 30, gameState.jumpPower * 5, 20);
  }
  drawJumpPowerGauge();
  // Check win condition
  checkWinCondition();
}

function applyGravity() {
  if (!player.grounded) {
    player.velocityY += 0.5;
    player.y += player.velocityY;
  } else {
    player.velocityY = 0;
  }
}

function keyPressed() {
  // Charge jump
  if (key === ' ' && player.grounded) {
    gameState.isJumping = true;
    gameState.jumpPower = 0;
  }
}

function keyReleased() {
  // Execute jump
  if (key === ' ' && gameState.isJumping && player.grounded) {
    let jumpMultiplier = gameState.jumpPower / 2;
    
    if (keyIsDown(65)) { // A key for left
      player.velocityX = -jumpMultiplier;
      player.velocityY = -jumpMultiplier;
    } else if (keyIsDown(68)) { // D key for right
      player.velocityX = jumpMultiplier;
      player.velocityY = -jumpMultiplier;
    } else { // Straight up jump
      player.velocityY = -gameState.jumpPower;
    }
    
    gameState.isJumping = false;
    player.grounded = false;
    gameState.jumpPower = 0;
  }
  
  // Charge jump power while space is held
  if (key === ' ' && gameState.isJumping) {
    gameState.jumpPower = min(gameState.jumpPower + 1, gameState.maxJumpPower);
  }
}


function drawJumpPowerGauge() {
  // Draw the jump power gauge
  fill(0, 0, 255, 100);
  rect(10, height - 30, gameState.jumpPower * 5, 20);
  
  // Draw the gauge border
  noFill();
  stroke(0);
  rect(10, height - 30, gameState.maxJumpPower * 5, 20);
}

function checkWallCollisions() {
  // Left wall collision
  if (player.x < 0) {
    player.x = 0;
    player.velocityX = 0;
  }
  
  // Right wall collision
  if (player.x + player.width > width) {
    player.x = width - player.width;
    player.velocityX = 0;
  }
}

function checkPlatformCollisions() {
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
  // Reset game to initial state
  initializeGame();
}

function displayKeyPresses() {
  // Debugging key press information
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  text(`Space Held: ${keyIsDown(32)}`, 10, 10);
  text(`A Held: ${keyIsDown(65)}`, 10, 25);
  text(`D Held: ${keyIsDown(68)}`, 10, 40);
  text(`Jump Power: ${gameState.jumpPower}`, 10, 55);
}
