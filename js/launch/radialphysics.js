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
var escapeVelocity = 3000;

// Viewport Vars
var viewportWidth = 13000;
var viewportHeight = 3500;
var planetHeight = 50000;
var dotW = 4;
var dotH = 4;
var dotColor = "green";

const zeroVector = {x:0, y:0};

var baseThrust = 2.2;
// Ship vars
var fuel = baseThrust * 250;
var position = {x:0, y: planetHeight};
    position.previous = position;
var velocity = {x:0, y:0, previous: zeroVector};
var thrust = {x:baseThrust*0, y:baseThrust*1, previous: zeroVector};//x=15

// logistical vars
var time = 0;
var step = 1000;

function tick() {
  //console.log(time);
  calculateVelocity();
  if(ship.isVisible()) {
    ship.render();
    //onScreenAvg.avg();
    console.log(time, "onscreen", position.x);
  } else {
    //offScreenAvg.avg();
    if(time%100===1){
      console.log(time, "offscreen", position.x);
    }
  }
  //console.log("onscreen : " + onScreenAvg.average + "\noffscreen: " + offScreenAvg.average);
  if(++time%step<step-1){
    setTimeout(tick, 0);
  } else {
    console.log("onscreen : " + onScreenAvg.average + "\noffscreen: " + offScreenAvg.average);
    //chance to stop and evaluate
    //debugger;
  }
}

var calculateVelocity = function () {
  calculateThrust();
  calculateNav();

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

  var thrustAdjustment = rollProgram(position.y - planetHeight, velocity);

  if(thrustAdjustment.type === "exact") {
    thrust.x = thrustAdjustment.xExact;
    var percentOfMaxThrust = thrust.y / maxThrust;
  } else if(thrustAdjustment.type === "percent") {
    thrust.x = totalThrust * thrustAdjustment.x;
    thrust.y = totalThrust * thrustAdjustment.y;
  }
};

var calculateNav = function() {

    nav.down = v.getGravity();
    nav.up = v.getReverse(nav.down);
    nav.clockwise = v.getStarboard(nav.up);
    nav.anticlockwise = v.getPort(nav.up);
    nav.prograde = v.subtract(position, position.previous);
    nav.retrograde = v.getReverse(nav.prograde);
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


ship.setup();
world.setup();
world.render();
tick();

