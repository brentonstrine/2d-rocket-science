window.RocketScience = window.RocketScience || {};

var v = RocketScience.vector || (function(){debugger;})();
var AvgType = RocketScience.PerformanceTracking || (function(){debugger;})();
var onScreenAvg = new AvgType("onscreen");
var offScreenAvg = new AvgType("offscreen");
var rollProgram = RocketScience.rollProgram || (function(){debugger;})();
var ship = RocketScience.ship;
var world = RocketScience.world;
var renderTools = RocketScience.renderTools;
var orbitalMechanics = RocketScience.orbitalMechanics();
var interface = new RocketScience.Interface();

// Relative Directions
var nav = {
  // planet-relative
  down: {x:null, y:null, m:null,},
  up: {x:null, y:null, m:null,},
  clockwise: {x:null, y:null, m:null,},
  anticlockwise: {x:null, y:null, m:null,},

  // ship-relative
  prograde: {x:null, y:null, m:null},
  retrograde: {x:null, y:null, m:null},
};

// Planet vars
var planet = RocketScience.planets["green"];
var gravityForce = planet.gravity;

// util vars
const zeroVector = {x:0, y:0};

// Ship vars
var baseThrust = 2;
var fuel = baseThrust * 400;
var position = {x:0, y: planet.height};
    position.previous = position;
var startingVelocity =  0;//314.8769602565012;//225.1343073610617;

var velocity = {x:startingVelocity, y:0, previous: zeroVector};
var thrust = {x:baseThrust*0, y:baseThrust*1};//x=15

// logistical vars
var time = 0;
var count = 0;
var step = 10000;
var timewarp = 100;

window.plotBatch = function plotBatch() {
  document.removeEventListener("click", plotBatch);
  // was getting into call stack size issues due to tail recursion when using a self-referencing function. so using a loop instead.
  for (var i = 0; i<step; i++){
    plotPosition();
  }
  document.addEventListener("click", plotBatch);

  console.log("Click to continue.");
};

window.plotPosition = function plotPosition() {
  time++;
  calculateVelocity();
  if(ship.isVisible()) {
    ship.render();
    onScreenAvg.avg();
    //console.log(time, "onscreen", position.x);
  } else {
    ship.logMoment();
    offScreenAvg.avg();
    if(time%100===1){
    //console.log(time, "offscreen", position.x);
    }
  }
  //console.log(time);
};

window.plotRealTime = function plotRealTime() {
  plotPosition();
  setTimeout(plotRealTime, timewarp);
};

var calculateVelocity = function () {
  calculateThrust();
  //calculateNav();
  //console.log(thrust);

  var gravityVector = v.getGravity();

  // log current velocity
  position.previous = {x: position.x, y: position.y};

  // update velocity
  velocity.x = velocity.x + thrust.x + gravityVector.x;
  velocity.y = velocity.y + thrust.y + gravityVector.y;

  // update position
  position.x = position.x + velocity.x;
  position.y = position.y + velocity.y;

  //show position
  //console.log("x: " + renderTools.cx(position.x), "y: " + renderTools.cy(position.y));
};

var gimbalOrder = null;

var calculateThrust = function () {
  // no thrust if not enough fuel
  var totalThrust = thrust.x + thrust.y;
  if (fuel > totalThrust) {
    ship.setDotColor("green");
    fuel = fuel - totalThrust;
  } else {
    ship.setDotColor("red");
    thrust.x = 0;
    thrust.y = 0;
    return;
  }

  var prograde = v.subtract(position, position.previous);
  if (gimbalOrder){
    if (gimbalOrder === "port") {
      thrust = v.getPort(prograde);
    } else if (gimbalOrder === "starboard") {
      thrust = v.getStarboard(prograde);
    }
    thrust = v.setMagnitude(thrust, baseThrust);
    gimbalOrder = false;
  } else {
    if (v.hasMagnitude(prograde.x)) {
      thrust = v.setMagnitude(prograde, baseThrust);
    }
  }
  fuel = fuel - baseThrust;
  console.log("fuel: " + fuel);

  // var thrustAdjustment = RocketScience.rollProgram(position.y - planet.height, velocity);
  //
  // if(thrustAdjustment.type === "exact") {
  //   thrust.x = thrustAdjustment.xExact;
  //   var percentOfMaxThrust = thrust.y / maxThrust;
  // } else if(thrustAdjustment.type === "percent") {
  //   thrust.x = totalThrust * thrustAdjustment.x;
  //   thrust.y = totalThrust * thrustAdjustment.y;
  // }
};

document.addEventListener("DOMContentLoaded", function(event) {
  renderTools.viewport("surface");
  ship.setup();
  world.setup();
  world.render();
  // plotBatch();
  plotRealTime();

  //var orbitalSpeed = orbitalMechanics.findOrbitalSpeed(500, 10);
  //log(orbitalSpeed);
});

