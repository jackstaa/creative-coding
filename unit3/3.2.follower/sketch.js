let x = 0;
let y = 0;
let d = 0;
let score = 0;
let velocity = 3;
let speedx = velocity;
let speedy = velocity;
let goalx = 0;
let goaly = 0;
let goalSize = 25;
let img;

//add a sprite
function preload(){
  img = loadImage("pac.png");
  img2 = loadImage("map.png");
}

function setup() {
  createCanvas(934, 451); // same dims as the map
  x = random(width);
  y = random(height);
  goalx = random(width);
  goaly = random(height);

}

function draw() {
  background(220);
  image(img2, 0,0, 934, 451 );
  image(img, x-50,y-30, 65 ,45);
  // distance formula
  d = sqrt((x - mouseX)**2 + (y - mouseY)**2);

  // add movement
  x += speedx;
  y += speedy;
  
  //draw goal
  rect(goalx, goaly, goalSize,goalSize);

  if(mouseX > x){
    // move to the right
    speedx = velocity;
  }else{
    // move to the left 
    speedx = -velocity;

  }
  if(mouseY > y){
    // move to the right
    speedy = velocity;
  }else{
    // move to the left 
    speedy = -velocity;

  }

  // check for a collision with the ghost
  if(d < 25){
    score = score - 1;
	velocity = velocity - 0.25; //make the ghost slower every time it catches the user
    x = random(width);
    y = random(height);
  } 
  if (velocity <= 0) {
	velocity = velocity + 0.25; //check for 0 or less velocity and add .25 to keep the game going
  }

  // check for a collision with the goal
  if(mouseX > goalx & mouseX < goalx + goalSize & mouseY > goaly & mouseY < goaly+goalSize){
    score = score + 1;
    velocity = velocity + 0.25; //make the ghost faster after every goal
    x = random(width);
    y = random(height);

    goalx = random(width);
    goaly = random(height);
  }
  textSize(20);
  fill("white");
  text("score: "+ score, 10, 50);
}
