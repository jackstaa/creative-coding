let poem = "";

let grammar = tracery.createGrammar(
  {
  "material": [
	"SAND",
	"DUST",
	"LEAVES",
	"BOOKS",
	"TIN",
	"ROOTS",
	"CONCRETE",
	"BROKEN HEARTS",
	"WOOD",
	"STRAW",
	"WEEDS",
	"CARDBOARD",
	"CLAY",
	"WORDS",
  ], "place": [
	  "A RIVER",
	  "A DOCK",
	  "A CLOCKTOWER",
	  "A FACTORY",
	  "A MALL",
	  "A NEIGHBOORHOOD",
	  "AN ABANDONED PAPER PLANT",
	  "A CONSTRUCTION SITE",
	  "A JUNGLE",
	  "A FOREST",
	  "A WINDY CLIFF",
  ], "light_source":[
	  "TORCHES",
	  "CANDLES",
	  "ELECTRICITY",
	  "NATURAL LIGHT",
	  "FLASHLIGHTS",
	  "LEDs",
	  "FIRES",
	  "LIGHTNING BUGS",
  ], "inhabitants":[
	  "OLD PEOPLE",
	  "YOUNG PEOPLE",
	  "A DIVERSE GROUP OF INDIVIDUALS",
	  "GHOSTS",
	  "BUGS",
	  "ANIMALS AND PEOPLE",
	  "WITCHES",
	  "VAMPIRES",
	  "DINOSAURS",
	  "LIZARDS",
  ], 
  "origin": "A HOUSE OF #material#\nBY #place#\nUSING #light_source\nINHABITED BY #inhabitants#"
}
);

poem = grammar.flatten("#origin#")

function setup() {
  createCanvas(800, 800);
  frameRate(1);
}

function draw() {
  background(220);

  text(poem, 50, 50);
}
