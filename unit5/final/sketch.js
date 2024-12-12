
// Assume `player` is an object with properties: x, y, velocityX, velocityY, and onGround.
let player;
let platforms;
let gameState;
let resetButton;

function preload(){
  img = loadImage("box.PNG");
  img2 = loadImage("bg.jpg");
}

function setup() {
    let canvas = createCanvas(400, 1000);
    //canvas.parent('sketch-holder');

    // Initialize game state
    initializeGame();

    // Create reset button
    resetButton = createButton('Reset Game');
    resetButton.position(10, height + 10);
    resetButton.mousePressed(resetGame);
}

function initializeGame() {
    gameState = {
        isJumping: false,
        jumpPower: 0,
        maxJumpPower: 20,
        jumpDirection: null,
        gameOver: false
    };

    player = {
        x: width / 2,
        y: height - 50,
        width: 20,
        height: 20,
        velocityY: 0,
        velocityX: 0,
        grounded: true
    };

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
        { x: width / 2, y: 60, width: 30, height: 10, isGoal: true }
    ];
}

function draw() {
    background(220);
    image(img2, 0,0, 400, 1000);

    // Draw platforms
    platforms.forEach(platform => {
        fill(platform.isGoal ? color(0, 255, 0) : color(100, 100, 100));
        rect(platform.x, platform.y, platform.width, platform.height);
    });

    // Update player position
    handleJump();
    applyGravity();
    player.x += player.velocityX;
    player.y += player.velocityY;

    checkPlatformCollisions();
    checkWallCollisions();

    // Draw player
    image(img, player.x, player.y, player.width, player.height);
  
    drawJumpMeter();

    // Check win condition
    checkWinCondition();
}

function applyGravity() {
    if (!player.grounded) {
        player.velocityY += 0.5;
    } else {
        player.velocityY = 0;
    }
}

let jumpTimer = 0;
const maxJumpTime = 1000; // Maximum jump charge time in milliseconds

function drawJumpMeter() {
  // Draw the jump meter background
  fill(0, 0, 0, 50);
  rect(10, height - 50, 200, 30);

  // Draw the jump meter fill
  fill(0, 0, 255);
  rect(10, height - 50, map(jumpTimer, 0, maxJumpTime, 0, 200), 30);

  // Draw the jump meter border
  noFill();
  stroke(0);
  rect(10, height - 50, 200, 30);
}

function handleJump() {
  // Hold space to charge the jump
  if (keyIsDown(32)) {
    // Increment the jump timer while space is held
    jumpTimer += deltaTime;
    jumpTimer = min(jumpTimer, maxJumpTime);
  } else {
    // Execute the jump when space is released
    if (jumpTimer > 0 && player.grounded) {
      // Calculate jump velocity based on charge time
      const jumpPower = map(jumpTimer, 0, maxJumpTime, 0, 20);

      // Determine jump direction based on key presses
      let xVelocity = 0;
      if (keyIsDown(65)) { // A key for left
        xVelocity = -5;
      } else if (keyIsDown(68)) { // D key for right
        xVelocity = 5;
      }

      // Apply the jump forces
      player.velocityY = -jumpPower;
      player.velocityX = xVelocity;
      player.grounded = false;
    }

    // Reset the jump timer when space is released
    jumpTimer = 0;
  }
}

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

function checkPlatformCollisions() {
    player.grounded = false;

    platforms.forEach(platform => {
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
            player.velocityX = 0;
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
        player.y + player.height <= goalPlatform.y &&
        player.x + player.width > goalPlatform.x &&
        player.x < goalPlatform.x + goalPlatform.width &&
        player.grounded === true
    ) {
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        text("YOU WIN!", width / 2, height / 2);
        noLoop(); // Stop the game
    }
}

function resetGame() {
    // Reset game to initial state
    initializeGame();
}
