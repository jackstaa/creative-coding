
let ripplers = [];

class Rippler{
  constructor(x,y){
    this.x = x,
    this.y = y,
    this.ripple =[];//Store ripples diameter and opacity
  }
  addRipple(){ //adding new ripple
    this.ripple.push({diameter: 0, opacity: 255});
  }

  drawRipples(){ // draw and update the ripples
    for(let i = 0; i< this.ripple.length; i++){
      let ripple = this.ripple[i];

      stroke(`rgba(255, 255, 255, ${ripple.opacity / 255})`);
      strokeWeight(2);
      noFill();
      circle(this.x, this.y, ripple.diameter);

      ripple.diameter +=3;
      ripple.opacity -=3;

    }
    this.ripple = this.ripple.filter(ripple=> ripple.opacity > 0); //remove ripples at opacity 0

  }
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#152997");

  // Draw the ripples
  for(let rippler of ripplers){
    rippler.drawRipples();

  }

}
function mousePressed(){
  let newRipple = new Rippler(mouseX, mouseY);
  ripplers.push(newRipple);
  //adding the amount of circles in the ripple
  //timeout to add space between ripples
  for(let i = 0; i< 10; i++){
    setTimeout(()=> newRipple.addRipple(), i *100);
  }

}
