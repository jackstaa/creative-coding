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
	"BRICK",
	"STONE",
	"TREASURE",
	"WINDOWS",
	"MIRRORS",
	"MUSIC",
	"CARS",
	"PLASTIC",
	"THORNS",
	"RAGS",
	"SHEETS",
	"SHELLS",
	"TREES",
	"CHAIRS",
	"DESKS",
	"PILLOWS",
	"TABLES",
	"BLANKETS",
	"COMPUTERS",
	"SCREENS",
	"PHONES",
	"PAGES",
	"ILLNESS",
	"DOORS",
	"BOARDS",
	"METAL",
	  
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
	  "THE EIFFEL TOWER",
	  "A HOUSE OF DUST",
	  "A CAVE",
	  "THE SEA",
	  "A LAKE",
	  "A SWAMP",
	  "A WATERFALL",
	  "A CITY",
	  "AN APARTMENT COMPLEX",
	  "ANOTHER HOUSE",
	  "A MOUNTAIN",
	  "A HILL",
	  "THE PENTAGON",
	  "THE WHITE HOUSE",
	  "A BOG",
	  "ALABAMA",
	  "A HOT DOG STAND",
	  "A RESTURANT",
	  "A FAST FOOD CHAIN",
	  "A MILITARY BASE",
	  "A CAMPGROUND",
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
	  "DOGS AND CATS",
	  "PEOPLE AND THIER PETS",
	  "BEST FRIENDS",
	  "LOVERS",
	  "SQUIRRELS",
	  "JUST CATS",
	  "ONE OLD LADY AND SEVERAL CATS",
	  "CRAZY PEOPLE",
	  "AILENS",
	  "CREATURES",
	  "A LONE PERSON WITH NO ONE ELSE AROUND",
	  "A COUPLE",
	  "SEVERAL DOGS BUT NO CATS",
	  "NO ONE",
	  "MOSQUITOS",
	  "FICTIONAL CHARACTERS",
	  "SOME DUDE",
  ], 
  "origin": "A HOUSE OF #material#\n     BY #place#\n         USING #light_source#\nINHABITED BY #inhabitants#"
}
);

function setup() {
  createCanvas(800, 800);
  frameRate(.1);
}

function draw() {
  background(220);
  textSize(25);

  //loop to create the stanzas
  for(let i = 1; i < 10; i+=1){
    //Generate the poem using the defined grammar
    poem = grammar.flatten("#origin#");
    //Put the poem on the screen
    text(poem, 50, i*50);
  }

}
