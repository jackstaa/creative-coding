/* I wanted to use Tracery for this project because I thought it would be fun.
   When in doubt do something related to fishing, becasue there are absurd amounts of fish
   I used the tracery example to format my grammar and updated the setup function as needed
   please enjoy my book about various fish doing various things
*/


//grammar format is from the tracery example
//the number idea is replaced to make it a little more vague
let grammar = tracery.createGrammar({
  bookTitle : "Fish Doing Some Sort of Something",
  chapterTitle : ["#number.capitalize# #adj.capitalize# #animal.s.capitalize#"],
  sentence : "The #adj# #animal# #verb#.",
  number : ["a few",
            "a couple",
            "Several",
            "Muliple",
            "two or three",
            "a lot of",
            "a bunch of",
            "twenty",
            "a school of"],
  adj: ["esteemed",
        "pristine",
        "striking",
        "gruesome",
        "outrageous",
        "rewarding",
        "altruistic",
        "grizzled",
        "agonizing",
        "cold",
        "aged",
        "exalted",
        "childlike",
        "lackadaisical",
        "rhetorical",
        "bruised",
        "accidental",
        "squeamish",
        "adjoining",
        "quintessential",
        "bold",
        "total",
        "acceptable",
        "wealthy",
        "stingy",
        "bawdy",
        "curved",
        "huge",
        "outstanding",
        "abusive",
        "divergent",
        "colorless",
        "gullible",
        "flickering",
        "creative",
        "obeisant",
        "sincere",
        "fair",
        "bad",
        "absolute",
        "high-level",
        "Spanish",
        "premium",
        "outlandish",
        "statuesque",
        "amazing",
        "offbeat",
        "threadbare",
        "macabre",
        "jealous"],
  animal: ["trout",
           "Oscar",
           "Bala shark",
           "Oregon chub",
           "Boga",
           "Hardhead catfish",
           "Noodlefish",
           "Bluefin tuna",
           "Banjo",
           "Flagfish",
           "Bamboo shark",
           "Opah",
           "Dace",
           "Capelin",
           "Clown triggerfish",
           "Mackerel",
           "Shovelnose sturgeon",
           "Glowlight danio",
           "Scat",
           "Olive flounder",
           "Chub",
           "Chinook salmon",
           "Hussar",
           "Pollyfish",
           "Manta ray",
           "Spanish mackerel",
           "Murray cod",
           "Parore",
           "Ghost knifefish",
           "Dab",
           "Betta",
           "Spookfish",
           "Stargazer",
           "Sea catfish",
           "Paradise fish",
           "Pipefish",
           "Leatherjacket",
           "Salmon",
           "Pacific hake",
           "Zingel",
           "Arowana",
           "Black dragonfish",
           "Albacore",
           "Prickleback",
           "Bigscale",
           "Lightfish",
           "Coley",
           "Kokopu",
           "Chimaera",
           "Rainbowfish"],
  verb: ["divide",
         "appreciate",
         "open",
         "warn",
         "advise",
         "ban",
         "object",
         "love",
         "watch",
         "matter",
         "pine",
         "flow",
         "fix",
         "pick",
         "fail",
         "complain",
         "land",
         "pass",
         "frame",
         "reproduce",
         "grip",
         "plant",
         "scrub",
         "obtain",
         "fasten",
         "stuff",
         "face",
         "paste",
         "nod",
         "transport",
         "explode",
         "dare",
         "empty",
         "tickle",
         "realise",
         "weigh",
         "scream",
         "cheer",
         "smash",
         "report",
         "search",
         "zoom",
         "rob",
         "rejoice",
         "obey",
         "shiver",
         "polish",
         "add",
         "gaze",
         "explain"],
  origin: "#chapterTitle#",
  paragraph : "#addSentences#",
  addSentences : ["#sentenceLoop# #sentence#","#sentenceLoop# #sentence#","#sentenceLoop# #sentence#","#sentenceLoop# #sentence#","#sentenceLoop# #sentence#", "#sentence#"],
  sentenceLoop : "#addSentences#",
});
// add some modifiers to help Tracery
grammar.addModifiers(tracery.baseEngModifiers);


// setup function is from the tracery example source code located at https://zachwhalen.github.io/creative-coding/unit4/book/example-tracery/
function setup() {
  noCanvas();
  
  // create the HTML #content container
  let content = createElement("div");
  content.attribute("id","content");
  
  // add the book title
  content.child(createElement("h1",grammar.flatten("#bookTitle#")))
  
  // chapter loop
  let c = 1;
  do {
    
    // pick a chapter title
    content.child(createElement("h2",  "Chapter " + c + ": " + grammar.flatten("#chapterTitle#")));
    
    // paragraph loop
    let p = 0;
    do {
      content.child(createElement("p",grammar.flatten("#paragraph#")));
      p++;
    }while (p < random(40,130));
    c++;
  }while (c < 55);
 
  // trigger the polyfill rendering
  window.PagedPolyfill.preview();
 
}
