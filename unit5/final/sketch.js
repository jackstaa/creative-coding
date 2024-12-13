//initialize stuff
let player;
let platforms;
let gameState;
let resetButton;
let jumpTimer = 0; //
const maxJumpTime = 1000; // Maximum jump charge time, basically what this does is it caps the players jump height at 20 pixels, but you have to hold the spacebar down for a second to reach said jump height

function preload(){ //preload method from unit 3's follower game
  img = loadImage("box.png");
  img2 = loadImage("bg.jpg");
}

function setup() {
    let canvas = createCanvas(400, 1000);
    //canvas.parent('sketch-holder'); <-- didnt end up needing this but its still in the index file so if theres any question about it thats why its there

    // Initialize game state
    initializeGame();

    // Create reset button
    resetButton = createButton('Reset Game');
    resetButton.position(width-400, height + 10);
    resetButton.mousePressed(resetGame);
}

function initializeGame() {
  //this section basically lays the groundwork for the game itself
    gameState = {
        isJumping: false,
        jumpPower: 0,
        maxJumpPower: 20,
        jumpDirection: null,
        gameOver: false
    };
//player constructor to set up the position and variables that go into moving the box around
    player = {
        x: width / 2,
        y: height - 50,
        width: 20,
        height: 20,
        velocityY: 0,
        velocityX: 0,
        grounded: true
    };
//This array is to set up the course, changing it around can make the game harder or easier
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
    image(img2, 0,0, 400, 1000); // add the image of the warehouse

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
  
  //remove the jump meter to make the game harder
    //drawJumpMeter();

    // Check win condition
    checkWinCondition();
}

//this function makes the player fall if they are not grounded
function applyGravity() {
    if (!player.grounded) {
        player.velocityY += 0.5;
    } else {
        player.velocityY = 0;
    }
}

// helper function to try to help the player time their jump
// otherwise i think this game might be too difficult to be fun
// function drawJumpMeter() {
//   // Draw the jump meter background
//   fill(0, 0, 0, 50);
//   rect(10, height - 50, 200, 30);

//   // Draw the jump meter fill
//   fill(0, 0, 255);
//   rect(10, height - 50, map(jumpTimer, 0, maxJumpTime, 0, 200), 30);

//   // Draw the jump meter border
//   noFill();
//   stroke(0);
//   rect(10, height - 50, 200, 30);
// }

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

      // Apply the XY velocity using the if statements above
      player.velocityY = -jumpPower; //jumpPower is calculated based on how long you hold space for
      player.velocityX = xVelocity;
      player.grounded = false;
    }

    // Reset the jump timer when space is released
    jumpTimer = 0;
  }
}

//simple collision mechanics to make players "bounce" off of the walls
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

// this is where it gets funky
// this part was mainly AI generated so there are some key flaws
// There is a bug where the player will simply just fall through a platform if they are going too fast
// or they will fall through a platform if they bounce off of a wall just before hitting the platform whilst falling
// my best idea to combat this was to add a reset button tbh
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
    // this was causing some errors so I actually added an extra platform to the bottom of the screen
   // this section should never be triggered
  // unless of course the player phases through the platform like i addressed in the top part
  // which is why its still here and not removed
    if (player.y + player.height > height) {
        resetGame();
    }
}

// here we use the same ideas as the previous function to apply a collision mechanic specially to the top platform
function checkWinCondition() {
    const goalPlatform = platforms.find(p => p.isGoal);
    if (
        player.y + player.height <= goalPlatform.y &&
        player.x + player.width > goalPlatform.x &&
        player.x < goalPlatform.x + goalPlatform.width &&
        player.grounded === true // ensuring that you have to land on the platform to win
    ) {
      //the lines below add a message telling the user they beat the game, I doubt anyones gonna see this honestly
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        text("YOU WIN!", width / 2, height / 2);
        noLoop(); // Stop the game
    }
}
// Reset game to initial state
// added in case there were bugs
// which there are definitely some bugs
function resetGame() {
    initializeGame(); 
}
