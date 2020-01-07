
const NPC = function(shapeType, loc_x, loc_y, width, height, color, collidesWithPlayer, collidesWithNPCs) {
  this.shape = new Shape(shapeType, loc_x, loc_y, width, height, color, collidesWithPlayer, collidesWithNPCs);

  this.currentAction = undefined; // What the NPC is currently doing

  // Goal would be helpful to have npcs that have different behavior to each other
  //this.goal = undefined
};

NPC.prototype = {
  constructor: NPC
};
