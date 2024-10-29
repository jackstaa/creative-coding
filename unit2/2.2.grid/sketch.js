function setup() {
  // create a canvas
  createCanvas(600, 600);


  // disable animation
  noLoop();

}

function draw() {
  background(220);

  // for (let x = 80; x < 120; x += 5){

  // 	circle(x,80,50);

  // }
   for (let x = 1; x < 9; x += 1){

   	for (let y = 1; y < 9; y += 1){
  	circle(x * 50,y * 50,50);
  	}

  }

}