// Holds all methods used by the frontend for validating and setting game settings

let settings = {
  "worldType": [[0,1,2,3], ["Grid","Hex","Linear","Platformer"]],
  "movementMethod": [[-1,0,1], ["None","Button/Keyboard","Mouse or Drag(TouchScreen)"]],
  "playerVS": [[-1,0,1], ["None","PvP","PvE"]],
  "NPCs": [0,99],
  "NPCBehavior": [[-1,0,1,2,3], ["Do Nothing","Attack Player","Follow Player","Attack other NPCs","Collect Items"]],
  "NPCDifficulty": [[0,1,2], ["Easy","Medium","Hard"]],
  "scoring": [[0,1,2,3], ["Collect Items","Kill other players","Kill NPCs","Surive (time)"]],
  "movement": [[0,1], ["Linear","Turn Based"]],
  "playerColor": "white",
  "backgroundColor": "black",
  "NPCColor": "blue",
  "itemColor": "green",
  "endGoal": [[0,1,2], ["Hit point amount","Die","Last Alive"]]
}

//Set Body programatically using the gameParams

//TODO: condense and clean up the string creation
let bodyInner = "";
let keys = Object.keys(settings);
for (let i=0;i<keys.length;i++) {
   let values = settings[keys[i]];
   if (values.length > 1 && values[0].length > 1) {
     bodyInner += "<div><h3>" + keys[i] + "</h3><select id= " + keys[i] + ">";
     for (let j=0;j<values[0].length;j++){
       bodyInner += "<option value=" + values[0][j] + ">" + values[1][j] + "</option>";
     }
     bodyInner += "</select></div>";
   } else {
      bodyInner += "<div><h3>" + keys[i] + "</h3><select id= " + keys[i] + ">";
      if (keys[i] == "NPCs") {
        for (let n=values[0];n<=values[1];n++) {
          bodyInner += "<option value=" + n + ">" + n + "</option>";
        }
      } else {
        bodyInner += "<option value=" + values + ">" + values + "</option>";
      }
      bodyInner += "</select></div>";
   }
}

bodyInner += "<div><button onclick=validateParams()>Start Game</button></div>"

document.body.innerHTML = bodyInner;

let validateParams = function() {
  //TODO: go through selected options from <select> objects and check if they are valid
  for (let i=0; i<keys.length; i++) {
    let element = document.getElementById(keys[i]);
    if (element) {
      console.log(keys[i]);
      settings[keys[i]] = element.options[element.selectedIndex].value;
    }
  }
  startGame(settings);
}

let startGame = function(settings) {
  document.body.innerHTML = '<canvas></canvas>';
  mainSetup(settings);
}

//startGame(gameSettings);
