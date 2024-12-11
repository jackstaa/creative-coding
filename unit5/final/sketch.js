
// Assume `player` is an object with properties: x, y, velocityX, velocityY, and onGround.
let player;
let platforms;
let gameState;
let resetButton;

function setup() {
    let canvas = createCanvas(400, 600);
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
        // Large platform on the left side of the screen
        { x: 0, y: height - 100, width: 110, height: 10 },
        { x: 0, y: height, width: 400, height: 10 },
        // Large platform on the right side of the screen
        { x: width - 150, y: height - 100, width: 110, height: 10 },
        // Platform above, in the middle
        { x: width / 2 - 50, y: height - 200, width: 110, height: 10 },
        // Platform in the middle right
        { x: width - 100, y: height - 300, width: 80, height: 10 },
        // Platform in the middle left
        { x: 20, y: height - 300, width: 80, height: 10 },
        // Goal platform
        { x: width / 2, y: 100, width: 25, height: 10, isGoal: true }
    ];
}

function draw() {
    background(220);

    displayKeyPresses();

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
    fill(255, 0, 0);
    rect(player.x, player.y, player.width, player.height);

    // Draw jump power gauge
    drawJumpPowerGauge();

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

function handleJump() {
    if (keyIsDown(32) && player.grounded) { // Space key
        player.velocityY = -15; // Base jump velocity

        if (keyIsDown(65)) { // A key
            player.velocityX = -5;
        } else if (keyIsDown(68)) { // D key
            player.velocityX = 5;
        } else {
            player.velocityX = 0;
        }

        player.grounded = false;
    }
}

function drawJumpPowerGauge() {
    fill(0, 0, 255, 100);
    rect(10, height - 30, gameState.jumpPower * 5, 20);

    noFill();
    stroke(0);
    rect(10, height - 30, gameState.maxJumpPower * 5, 20);
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
