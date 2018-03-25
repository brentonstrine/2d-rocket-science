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
var gravityVector = {x:null, y:null};
var gravityForce = -1;

// Viewport Vars
var planetHeight = 50000;
var viewportWidth = 1000;// is not scaled
var viewportHeight = 500;// is not scaled
var viewportScale = 1;
var viewportOffset = {}; // are not scaled (but any scalable variables used must be scaled)
  // Planet center is centered
  // viewportOffset.x = viewportWidth/2;
  // viewportOffset.y = viewportHeight/-2;

  // 50 pixels below the surface
  // viewportOffset.x = viewportWidth/2;
  // viewportOffset.y = renderTools.s(planetHeight) - 50;

  // Launch point is centered
  // viewportOffset.x = viewportWidth/2;
  // viewportOffset.y = renderTools.s(planetHeight) - viewportHeight/2;

    viewportOffset.x = viewportWidth/2;
    viewportOffset.y = renderTools.s(planetHeight) - viewportHeight/2;

var dotW = 4;
var dotH = 4;
var dotColor = "green";

const zeroVector = {x:0, y:0};

var baseThrust = 2.2;
// Ship vars
var fuel = baseThrust * 0;
var position = {x:0, y: planetHeight + 75};
    position.previous = position;
var startingVelocity =  225.1343073610617;
var velocity = {x:startingVelocity, y:0, previous: zeroVector};
var thrust = {x:baseThrust*0, y:baseThrust*1, previous: zeroVector};//x=15

// logistical vars
var time = 0;
var count = 0;
var step = 10000;


window.plotBatch = function plotBatch() {
  // was getting into call stack size issues due to tail recursion when using a self-referencing function. so using a loop instead.
  for (var i = 0; i<step; i++){
    plotPosition();
  }
  console.log("Click to continue.");
  console.log("onscreen : " + onScreenAvg.average + "\noffscreen: " + offScreenAvg.average);
};

window.plotPosition = function plotPosition() {
  time++;
  calculateVelocity();
  if(ship.isVisible()) {
    ship.render();
    onScreenAvg.avg();
    //console.log(time, "onscreen", position.x);
  } else {
    offScreenAvg.avg();
    if(time%100===1){
    //console.log(time, "offscreen", position.x);
    }
  }
};


window.plotRealTime = function plotRealTime() {
  plotPosition();
  setTimeout(plotRealTime, 1000);
  time++;
};

var calculateVelocity = function () {
  calculateThrust();
  //calculateNav();

  gravityVector = v.getGravity();

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


var calculateThrust = function () {
  // no thrust if not enough fuel
  var totalThrust = thrust.x + thrust.y;
  if (fuel > totalThrust) {
    fuel = fuel - totalThrust;
  } else {
    dotColor = "red";
    thrust.x = 0;
    thrust.y = 0;
    return;
  }

  // var thrustAdjustment = rollProgram(position.y - planetHeight, velocity);
  //
  // if(thrustAdjustment.type === "exact") {
  //   thrust.x = thrustAdjustment.xExact;
  //   var percentOfMaxThrust = thrust.y / maxThrust;
  // } else if(thrustAdjustment.type === "percent") {
  //   thrust.x = totalThrust * thrustAdjustment.x;
  //   thrust.y = totalThrust * thrustAdjustment.y;
  // }
};

var rollProgram = function(altitude, velocity) {

  var climbSpeed = velocity.y;
  var speed = velocity.x;

  // returns an object containing what percent of thrust should go in the x and y direction (always needs to add to 100)
  if (time < 1) {
    return {y: 1, x:0, type: "percent"};
  } else if (time < 5) {
    return {y: 0.99, x:0.01, type: "percent"};
  } else if (time < 10) {
    return {y: 0.95, x:0.05, type: "percent"};
  } else if (time < 20) {
    return {y: 0.9, x:0.1, type: "percent"};
  } else if (time < 30) {
    return {y: 0.6, x:0.4, type: "percent"};
  } else if (time < 40) {
    return {y: 0.4, x:0.6, type: "percent"};
  } else if (time < 120) {
    return {y: 0.3, x:0.7, type: "percent"};
  } else if (time < 500) {
    return {y: 0.1, x:0.9, type: "percent"};
  }
  // else {
  //   var deltaVToOrbit = escapeVelocity - speed;
  //   if (deltaVToOrbit < baseThrust){ // if we use max thrust we will overshoot
  //
  //     // We're very close, so let's bleed off any vertical velocity (by coasting) before honing in on orbital speed
  //     if (velocity.x > 1) {
  //       return {xExact: 0, type: "exact"};
  //     }
  //     // bleed off any decimals to avoid javascript math errors
  //     var decimals = deltaVToOrbit % 1;
  //     var thrust = (decimals === 0) ? deltaVToOrbit : Math.floor(deltaVToOrbit/2) + decimals;
  //
  //     return {xExact: thrust, type: "exact"};
  //   }
  return {y: 0, x:1, type: "percent"};
};


document.addEventListener("DOMContentLoaded", function(event) {
  ship.setup();
  world.setup();
  world.render();
  //plotBatch();
  //plotRealTime();

  var orbitalSpeed = orbitalMechanics.findOrbitalSpeed(75, 30);
  log(orbitalSpeed);
});

