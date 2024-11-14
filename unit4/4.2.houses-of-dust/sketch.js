let poem = "";

let grammar = tracery.createGrammar(
  {
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
  "origin": "A HOUSE OF #material#"
}
);

poem = grammar.flatten("#origin#")

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(220);

  text(poem, 50, 50);
}
