let quatrain = '';

let grammar = tracery.createGrammar({
  "material": [
	"SAND",
	"DUST",
	"LEAVES",
	"PAPER",
	"TIN",
	"ROOTS",
	"BRICK",
	"BROKEN DISHES",
	"WOOD",
	"STRAW",
	"WEEDS"
  ],
  "light":[
  	"USING ELECTRICITY",
  	"WITH CANDLES"
  ],
  "origin": "A HOUSE OF #material# \n #light# "
});

quatrain = grammar.flatten("#origin#");


function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(220);

  textSize(40);
  text(quatrain,50,70);
}