// Ensure you declare player globally
let player;
let platforms; // Group for platforms
let bgImg, playerImg;

let jumpCharge = 0;
const maxJumpCharge = 1000; // charge time in ms for maximum jump power
let isChargingJump = false;

let gameState = { gameOver: false, win: false };
let resetButton;

function preload() {
  playerImg = loadImage("box.png");
  bgImg = loadImage("bg.jpg");
}

function setup() {
  createCanvas(400, 1000);

  // Create the player sprite centered at the bottom
  player = createSprite(width / 2, height - 50, 20, 20);
  // Instead of addImage, try using addAnimation if addImage is not available:
  player.addAnimation("default", playerImg);
  
  // Create a group for platforms
  platforms = new Group();

  // Data for platforms. Adjust positions so that p5.play’s coordinate system (center based)
  // works well, by using half-width offsets. (For clarity we create the sprite at the center.)
  let platformData = [
    { x: 55, y: height - 100, w: 110, h: 10, isGoal: false },
    { x: 200, y: height, w: 400, h: 10, isGoal: false },
    { x: width - 150 + 55, y: height - 100, w: 110, h: 10, isGoal: false },
    { x: width / 2 - 50 + 55, y: height - 200, w: 110, h: 10, isGoal: false },
    { x: width - 100 + 40, y: height - 300, w: 80, h: 10, isGoal: false },
    { x: 20 + 40, y: height - 300, w: 80, h: 10, isGoal: false },
    { x: 0 + 35, y: height - 400, w: 70, h: 10, isGoal: false },
    { x: width - 100 + 50, y: height - 600, w: 100, h: 10, isGoal: false },
    { x: width / 2 + 55, y: height - 400, w: 110, h: 10, isGoal: false },
    { x: width / 2 - 50 + 55, y: height - 700, w: 110, h: 10, isGoal: false },
    { x: width / 2 - 50 + 55, y: height - 550, w: 110, h: 10, isGoal: false },
    { x: 0 + 50, y: height - 750, w: 100, h: 10, isGoal: false },
    { x: width / 2 + 20, y: 45, w: 40, h: 10, isGoal: true }
  ];

  // Create platform sprites from the data
  platformData.forEach(data => {
    let plat = createSprite(data.x, data.y, data.w, data.h);
    plat.immovable = true;
    plat.isGoal = data.isGoal; // mark the goal platform
    platforms.add(plat);
  });

  // Create reset button
  resetButton = createButton('Reset Game');
  resetButton.position(width - 400, height + 10);
  resetButton.mousePressed(resetGame);
}

function draw() {
  background(220);
  image(bgImg, 0, 0, 400, 1000);
  
  if (!gameState.gameOver && !gameState.win) {
    // Apply gravity to player every frame:
    player.velocity.y += 0.5;

    // Horizontal movement via keys: A/LEFT for left, D/RIGHT for right.
    if (keyDown("a") || keyDown(LEFT_ARROW)) {
      player.velocity.x = -5;
    } else if (keyDown("d") || keyDown(RIGHT_ARROW)) {
      player.velocity.x = 5;
    } else {
      player.velocity.x = 0;
    }
    
    // Jump charge handling:
    // Start charging if space is pressed and the player is on the ground
    if (keyWentDown("space") && player.touching.bottom) {
      isChargingJump = true;
      jumpCharge = 0;
    }
    // Accumulate charge while space is held
    if (keyDown("space") && isChargingJump) {
      jumpCharge += deltaTime;
      jumpCharge = constrain(jumpCharge, 0, maxJumpCharge);
    }
    // On release, perform jump if player is grounded
    if (keyWentUp("space") && isChargingJump && player.touching.bottom) {
      let jumpPower = map(jumpCharge, 0, maxJumpCharge, 0, 20);
      player.velocity.y = -jumpPower;
      isChargingJump = false;
      jumpCharge = 0;
    }
    
    // Handle collisions with platforms.
    // The collide() method automatically prevents overlapping and calls our callback.
    player.collide(platforms, platformCollision);

    // Check if the player falls off screen
    if (player.position.y - player.height/2 > height) {
      resetGame();
    }
    
    // Check win condition by testing if player collides with the goal platform from above
    platforms.forEach(p => {
      if (p.isGoal && player.collide(p)) {
        // A simple check: if the player’s vertical position is above the goal platform's center,
        // we count this as landing on the goal.
        if (player.position.y < p.position.y) {
          gameState.win = true;
        }
      }
    });

    drawSprites();

    // (Optional) Uncomment to display a jump meter at the bottom of the canvas:
    // drawJumpMeter();
  } else if (gameState.win) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2);
  }
}

// Custom collision callback: If the player collides from above, adjust its y-velocity and position.
function platformCollision(sprite, platform) {
  if (sprite.previousPosition.y + sprite.height/2 <= platform.position.y - platform.height/2) {
    sprite.velocity.y = 0;
    sprite.position.y = platform.position.y - platform.height/2 - sprite.height/2;
  }
}

function resetGame() {
  player.position.x = width / 2;
  player.position.y = height - 50;
  player.velocity.x = 0;
  player.velocity.y = 0;
  
  gameState.gameOver = false;
  gameState.win = false;
}

function drawJumpMeter() {
  fill(0, 0, 0, 50);
  rect(10, height - 50, 200, 30);
  fill(0, 0, 255);
  rect(10, height - 50, map(jumpCharge, 0, maxJumpCharge, 0, 200), 30);
  noFill();
  stroke(0);
  rect(10, height - 50, 200, 30);
}
