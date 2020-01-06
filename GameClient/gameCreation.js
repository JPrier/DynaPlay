// Holds all methods used by the frontend for validating and setting game settings


//TODO: set settings off of html inputs (drop downs, text, etc)

let gameSettings = [];
let parameters = undefined;

require(['json!/GameClient/config.json'], function(data){
  parameters = data;
})

//Set Body programatically using the gameParams
let bodyInner = "";
for (let i=0;i<parameters.nameList.length;i++) {
  console.log(parameters.nameList[i]);
}

document.body.innerHTML = bodyInner;

let validateParams = function() {
  //TODO: go through selected options from <select> objects and check if they are valid
}

let startGame = function(gameSettings) {
  document.body.innerHTML = '<canvas></canvas>';
  mainSetup(gameSettings);
}

startGame(gameSettings);
