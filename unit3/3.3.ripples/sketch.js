let ripplers = [];
//class constructor
class Rippler{
  constructor(x,y){
    this.x = x,
    this.y = y,
    this.ripple =[];//Store ripple diameter and opacity
  }
  addRipple(){ //adding new ripple
    this.ripple.push({diameter: 0, opacity: 255});
  }
//function to draw a ripple and track its diameter and opacity
  drawRipples(){ // draw and update the ripples
    for(let i = 0; i< this.ripple.length; i++){
      let ripple = this.ripple[i];
      stroke(`rgba(255, 255, 255, ${ripple.opacity / 255})`);
      strokeWeight(2);
      noFill();
      circle(this.x, this.y, ripple.diameter);
      ripple.diameter +=3; //bigger rings means cooler
      ripple.opacity -=2; //lower opacity means ripples stay for a longer period
    }
    this.ripple = this.ripple.filter(ripple=> ripple.opacity > 0); //remove ripples at opacity 0
  }
}
//function to create the canvas
function setup() {
  createCanvas(800, 800);
}
//function to draw background and ripples
function draw() {
  background("#152997");
  // Draw the ripples
  for(let rippler of ripplers){
    rippler.drawRipples();
  }
}
//function to capture mouse clicks 
//10 ripples per click
function mousePressed(){
  let newRipple = new Rippler(mouseX, mouseY);
  ripplers.push(newRipple);
  for(let i = 0; i< 10; i++){
    setTimeout(()=> newRipple.addRipple(), i *100);   //timeouts on each ripple to add space between them
  }
}
