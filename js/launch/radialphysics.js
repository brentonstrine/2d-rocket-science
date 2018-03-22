window.RocketScience = window.RocketScience || {};

var v = RocketScience.vector || (function(){debugger;})();
var AvgType = RocketScience.PerformanceTracking || (function(){debugger;})();
var onScreenAvg = new AvgType("onscreen");
var offScreenAvg = new AvgType("offscreen");
var rollProgram = RocketScience.rollProgram || (function(){debugger;})();
var ship = RocketScience.ship;
var world = RocketScience.world;

// Relative Directions
var nav = {
  // planet-relative
  down: {x:null, y:null,},
  up: {x:null, y:null,},
  clockwise: {x:null, y:null,},
  anticlockwise: {x:null, y:null,},

  // ship-relative
  prograde: {x:null, y:null,},
  retrograde: {x:null, y:null,},
};

// Planet vars
var gravityVector = {x:null, y:null};
var gravityForce = -1;

// Viewport Vars
var viewportWidth = 10000;
var viewportHeight = 1500;
var planetHeight = 50000;
var dotW = 4;
var dotH = 4;
var dotColor = "green";


var baseThrust = 2;
// Ship vars
var fuel = baseThrust * 50;
var position = {x:0, y: planetHeight + 20, previous: {}};
var velocity = {x:0, y:0, previous: {}};
var thrust = {x:baseThrust*.4, y:baseThrust*.6, previous: {}};//x=15

// logistical vars
var count = 0;
var step = 2000;

function tick() {
  //console.log(count);
  calculateVelocity();
  if(ship.isVisible()) {
    ship.render();
    onScreenAvg.avg();
  } else {
    offScreenAvg.avg();
  }
  //console.log("onscreen : " + onScreenAvg.average + "\noffscreen: " + offScreenAvg.average);
  if(++count%step<step-1){
    setTimeout(tick, 0);
  } else {
    console.log("onscreen : " + onScreenAvg.average + "\noffscreen: " + offScreenAvg.average);
    //chance to stop and evaluate
    //debugger;
  }
}

var calculateVelocity = function () {
  // no thrust if not enough fuel
  var totalThrust = thrust.x + thrust.y;
  if (fuel > totalThrust) {
    fuel = fuel - totalThrust;
  } else {
    dotColor = "red";
    thrust = {x:0, y:0};
  }

  gravityVector = v.getGravity();

  // log current velocity
  position.previous = {x: position.x, y: position.y};

  // update velocity
  velocity.x = velocity.x + thrust.x + gravityVector.x;
  velocity.y = velocity.y + thrust.y + gravityVector.y;

  // update position
  position.x = position.x + velocity.x;
  position.y = position.y + velocity.y;

};


var calculateThrust = function () {
debugger;
  // no thrust if not enough fuel
  var totalThrust = thrust.x + thrust.y;
  if (fuel > totalThrust) {
    fuel = fuel - totalThrust;
  } else {
    dotColor = "gray";
    return {x:0, y:0};
  }

  // nav.down = v.getDown();
  // nav.up = v.getReverse(nav.down);
  // nav.clockwise = v.getStarboard(up);
  // nav.anticlockwise = v.getPort(up);


  gravityVector = v.getGravity(down);

  // update velocity
  velocity.x = velocity.x + thrust.x + gravityVector.x;
  velocity.y = velocity.y + thrust.y + gravityVector.y;

  // update position
  position.x = position.x + velocity.x;
  position.y = position.y + velocity.y;

};
ship.setup();
world.setup();
world.render();
tick();