//initialize stuff
let player;
let platforms;
let gameState;
let resetButton;
let jumpTimer = 0;
const maxJumpTime = 1000; // Maximum jump charge time
let bufferedDirection = 0;

function preload() {
  img = loadImage("box.png");
  img2 = loadImage("bg.jpg");
}

function setup() {
  let canvas = createCanvas(400, 1000);
  // canvas.parent('sketch-holder'); // kept for potential legacy use
  initializeGame();
  
  // Create reset button
  resetButton = createButton('Reset Game');
  resetButton.position(width - 400, height + 10);
  resetButton.mousePressed(resetGame);
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
  
  // Set up player with previous position fields for robust collision detection
  player = {
    x: width / 2,
    y: height - 50,
    prevX: width / 2,
    prevY: height - 50,
    width: 20,
    height: 20,
    velocityY: 0,
    velocityX: 0,
    grounded: true
  };

  // Define the platforms. One platform has an extra property isGoal.
  platforms = [
    { x: 0, y: height - 100, width: 110, height: 10 },
    { x: 0, y: height, width: 400, height: 10 },
    { x: width - 150, y: height - 100, width: 110, height: 10 },
    { x: width / 2 - 50, y: height - 200, width: 110, height: 10 },
    { x: width - 100, y: height - 300, width: 80, height: 10 },
    { x: 20, y: height - 300, width: 80, height: 10 },
    { x: 0, y: height - 400, width: 70, height: 10 },
    { x: width - 100, y: height - 600, width: 100, height: 10 },
    { x: width / 2, y: height - 400, width: 110, height: 10 },
    { x: width / 2 - 50, y: height - 700, width: 110, height: 10 },
    { x: width / 2 - 50, y: height - 550, width: 110, height: 10 },
    { x: 0, y: height - 750, width: 100, height: 10 },
    { x: width / 2, y: 45, width: 40, height: 10, isGoal: true }
  ];
}

function draw() {
  background(220);
  image(img2, 0, 0, 400, 1000); // Draw background

  // Draw platforms – goal platforms are highlighted in green
  platforms.forEach(platform => {
    fill(platform.isGoal ? color(0, 255, 0) : color(100, 100, 100));
    rect(platform.x, platform.y, platform.width, platform.height);
  });

  // Update previous position for collision detection
  player.prevX = player.x;
  player.prevY = player.y;

  // Handle user input for jump charging and air control
  handleJump();      // handles charging jump and launching when space is released
  handleAirControl(); // allow slight horizontal adjustments while airborne

  // Apply gravity if not grounded
  applyGravity();

  // Update player position using current velocity values
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Check collisions against platforms and walls
  checkPlatformCollisions();
  checkWallCollisions();

  // Draw the player
  image(img, player.x, player.y, player.width, player.height);

  // Check for win condition
  checkWinCondition();
}

// Apply gravity only when the player is not on a platform
function applyGravity() {
  if (!player.grounded) {
    player.velocityY += 0.5;
  } else {
    player.velocityY = 0;
  }
}

// Handle jump charging and launching when the spacebar is released.
// Also supports both A/D and LEFT/RIGHT arrow keys for horizontal influence at jump time.
function handleJump() {
  // When the spacebar is held, charge the jump and update the buffered direction.
  if (keyIsDown(32)) { // 32 is the key code for space
    jumpTimer += deltaTime;
    jumpTimer = min(jumpTimer, maxJumpTime);

    // Update buffered direction: even if the directional keys are released,
    // the most recent pressed value remains.
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // A key or left arrow
      bufferedDirection = -1;
    } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // D key or right arrow
      bufferedDirection = 1;
    }
    // If neither left nor right is pressed, keep the last buffered value.
    
  } else {
    // When space is released, and the player is on the ground, execute the jump.
    if (jumpTimer > 0 && player.grounded) {
      // Map the charge time to jump power (up to gameState.maxJumpPower)
      const jumpPower = map(jumpTimer, 0, maxJumpTime, 0, gameState.maxJumpPower);
      let xVelocity = 0;
      if (bufferedDirection === -1) {
        xVelocity = -5;
      } else if (bufferedDirection === 1) {
        xVelocity = 5;
      }

      // Apply the jump: set vertical and horizontal velocities,
      // then mark the player as no longer grounded.
      player.velocityY = -jumpPower;
      player.velocityX = xVelocity;
      player.grounded = false;
    }
    // Reset the jump timer and clear the buffered direction after releasing space.
    jumpTimer = 0;
    bufferedDirection = 0;
  }
}

// Allow slight horizontal control while in the air.
// This enhances responsiveness without altering the core challenge.
function handleAirControl() {
  if (!player.grounded) {
    // Adjust horizontal velocity gradually
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      player.velocityX -= 0.2;
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      player.velocityX += 0.2;
    }
    // Constrain horizontal speed to a maximum value
    player.velocityX = constrain(player.velocityX, -5, 5);
  }
}

// Reverse velocity on wall collisions and clamp the player's position within the canvas.
function checkWallCollisions() {
  // Left wall collision
  if (player.x < 0) {
    player.x = 0;
    player.velocityX = -player.velocityX;
  }
  // Right wall collision
  if (player.x + player.width > width) {
    player.x = width - player.width;
    player.velocityX = -player.velocityX;
  }
}

// Improved platform collision detection using player's previous position.
// This handles both landing collisions and head collisions reliably even at high speeds.
function checkPlatformCollisions() {
  // Assume not grounded until a collision is detected.
  player.grounded = false;

  platforms.forEach(platform => {
    // Check for horizontal overlap first.
    const isHorizontallyOverlapping =
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x;

    if (isHorizontallyOverlapping) {
      // LANDING COLLISION:
      // If falling (velocityY >= 0) and the bottom of the player crossed the platform's top between frames.
      if (player.velocityY >= 0 &&
          player.prevY + player.height <= platform.y &&
          player.y + player.height >= platform.y) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
        // Optionally, reset horizontal speed on landing:
        player.velocityX = 0;
      }

      // HEAD COLLISION:
      // If ascending (velocityY < 0) and the top of the player crosses the platform's bottom.
      if (player.velocityY < 0 &&
          player.prevY >= platform.y + platform.height &&
          player.y <= platform.y + platform.height) {
        player.y = platform.y + platform.height;
        player.velocityY = 0;
      }
    }
  });

  // Bottom boundary check (in case the player falls off the screen).
  if (player.y + player.height > height) {
    resetGame();
  }
}

// Check if the player has landed on the designated goal platform.
function checkWinCondition() {
  const goalPlatform = platforms.find(p => p.isGoal);
  if (goalPlatform &&
      player.grounded &&
      player.y + player.height <= goalPlatform.y + 5 && // allow a small margin
      player.x + player.width > goalPlatform.x &&
      player.x < goalPlatform.x + goalPlatform.width) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2);
    noLoop(); // Stop the game loop
  }
}

// Reset game by reinitializing game objects and variables
function resetGame() {
  initializeGame();
}
