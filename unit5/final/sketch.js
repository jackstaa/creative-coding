let player;
let platforms;
let bgImg, playerImg;

let jumpCharge = 0;
const maxJumpCharge = 1000;
let isChargingJump = false;
let isGrounded = false;
let coyoteTime = 0;
const coyoteDuration = 100;

let gameState = { gameOver: false, win: false };
let resetButton;

let targetVelocityX = 0;
const maxSpeed = 5;
const acceleration = 0.5;
const deceleration = 0.3;

// Custom drawSprites
function drawSprites(group) {
  group = group || window.allSprites;
  if (group && group.draw) {
    group.draw();
  } else {
    console.warn("drawSprites: group or group.draw unavailable", group);
  }
}

function preload() {
  playerImg = loadImage("box.png");
  bgImg = loadImage("bg.jpg");
}

function setup() {
  new Canvas(400, 1000);

  // Debug: Verify p5play
  console.log("Sprite constructor:", typeof Sprite);
  console.log("allSprites defined:", typeof allSprites);
  console.log("p5play version:", typeof p5play !== "undefined" ? p5play.version : "unknown");

  // Create player sprite
  player = new Sprite();
  player.x = width / 2;
  player.y = height - 50;
  player.width = 2;
  player.height = 2;
  player.image = playerImg;
  // Debug sprite size
  console.log("player size:", player.width, player.height);
  console.log("player position:", player.x, player.y);
  player.friction = 0;
  player.maxSpeed = maxSpeed;

  // Create platform group
  platforms = new Group();

  // Platform data
  let platformData = [
    { x: 55, y: height - 100, w: 110, h: 10, isGoal: false },
    { x: 200, y: height - 10, w: 400, h: 10, isGoal: false }, // Adjusted ground platform
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

  // Create platforms
  platformData.forEach(data => {
    let plat = new Sprite();
    plat.x = data.x;
    plat.y = data.y;
    plat.width = data.w;
    plat.height = data.h;
    plat.immovable = true;
    plat.isGoal = data.isGoal;
    platforms.add(plat);
    console.log("platform at y =", data.y, "size:", plat.width, plat.height);
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
    // Apply gravity
    player.velocity.y += 0.5;

    // Smooth horizontal movement
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      targetVelocityX = -maxSpeed;
    } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      targetVelocityX = maxSpeed;
    } else {
      targetVelocityX = 0;
    }

    // Accelerate/decelerate
    if (targetVelocityX > player.velocity.x) {
      player.velocity.x = min(player.velocity.x + acceleration, targetVelocityX);
    } else if (targetVelocityX < player.velocity.x) {
      player.velocity.x = max(player.velocity.x - deceleration, targetVelocityX);
    }

    // Check if player is grounded
    isGrounded = false;
    player.collide(platforms, (player, plat) => {
      if (player.velocity.y >= 0 && player.y - player.height / 2 <= plat.y - plat.height / 2) {
        isGrounded = true;
        player.velocity.y = 0;
        coyoteTime = 0;
        console.log("Collided with platform at y =", plat.y);
      }
    });

    // Update coyote time
    if (!isGrounded) {
      coyoteTime += deltaTime;
      console.log("Player falling: y =", player.y, "velocity.y =", player.velocity.y);
    }

    // Jump charge handling
    if (isChargingJump && keyIsDown(32)) {
      jumpCharge += deltaTime;
      jumpCharge = constrain(jumpCharge, 0, maxJumpCharge);
    }

    // Check for falling off screen
    if (player.y + player.height / 2 > height + 100) {
      console.log("Reset triggered: player.y =", player.y, "height =", player.height);
      resetGame();
    }

    // Check win condition
    platforms.forEach(p => {
      if (p.isGoal && player.collide(p) && player.y < p.y) {
        gameState.win = true;
      }
    });

    // Render sprites
    drawSprites();
    drawJumpMeter();
  } else if (gameState.win) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === 32 && (isGrounded || coyoteTime < coyoteDuration)) {
    isChargingJump = true;
    jumpCharge = 0;
  }
}

function keyReleased() {
  if (keyCode === 32 && isChargingJump && (isGrounded || coyoteTime < coyoteDuration)) {
    let jumpPower = map(jumpCharge, 0, maxJumpCharge, 0, 20);
    player.velocity.y = -jumpPower;
    isChargingJump = false;
    jumpCharge = 0;
  }
}

function resetGame() {
  player.x = width / 2;
  player.y = height - 50;
  player.velocity.x = 0;
  player.velocity.y = 0;
  gameState.gameOver = false;
  gameState.win = false;
  isChargingJump = false;
  jumpCharge = 0;
  coyoteTime = 0;
  console.log("Game reset: player.y =", player.y);
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
