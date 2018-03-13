console.clear();
// DOM Constants
var world = document.querySelector(".world");
var worldHeight = 2100;

// Universe constants
var escapeVelocity = 3000;
var gravity = -1; // pixel per second
var microgravity = gravity;

// Rocket Equation
var maxConsumption = 1; // unit per second
var efficiency = 100.1; // thrust per unit consumed
var maxThrust = maxConsumption * efficiency;
var thrust = {x: maxThrust, y: 0}; // pixel per second
var dryMass = 10; // pounds
var fuelMass = 90; //pounds
var weight = (dryMass + fuelMass) * gravity;
var twr = thrust.x/(weight*gravity); // thrust/weight ratio
var wind = 0; // non-accelerative
var velocity = {x: 0, y: 0};
var position = {x: 0, y: 0};
var oldPos = {x: 0, y: 0};


var maxTime = 300;
var maxHeight = 0;
var maxVelocity = {x:0, y:0};
var targetAltitude = 1100;

var plotRocketAt = function(t) {
  oldPos = {x:position.x, y:position.y};

  t++;
  var fuelConsumed;

  if (fuelMass <= 0) {
    // empty, or worse!
    fuelConsumed = 0;
    fuelMass = 0;
    thrust.x = 0;
    thrust.y = 0;
    debugger; // really, if the below works correctly, we shouldn't land here
  }

  // Adjust thrust according to roll program
  var totalThrust = thrust.x + thrust.y;
  var thrustAdjustment = rollProgram(position.x, velocity);

  if(thrustAdjustment.type === "exact") {
    thrust.y = thrustAdjustment.yExact;
    var percentOfMaxThrust = thrust.y / maxThrust;
    fuelConsumed = maxConsumption * percentOfMaxThrust;
  } else if(thrustAdjustment.type === "percent") {
    thrust.x = totalThrust * thrustAdjustment.x;
    thrust.y = totalThrust * thrustAdjustment.y;
    fuelConsumed = maxConsumption;
  }

  if (fuelConsumed > fuelMass) {
    // we can't do full thrust
    fuelConsumed = fuelMass;
  }
  fuelMass = fuelMass - fuelConsumed;

  changeWind(position.y);
  if (Math.abs(velocity.y) < Math.abs(wind)) {
    velocity.y += wind;
  }

  // Calculating Y
  position.y = (position.y + velocity.y + thrust.y);
  velocity.y = position.y - oldPos.y;

  // Calculating X
  // curvature adjustment
  var rangeSpeed = position.y - oldPos.y;
  var curvatureAdjustment = rangeSpeed / escapeVelocity;
  microgravity = (curvatureAdjustment < 1) ? (gravity + curvatureAdjustment) : 0.000000000000001;

  weight = (dryMass + fuelMass) * microgravity;
  twr = thrust.x / (weight*microgravity);
console.log(twr);
var climb = (twr + microgravity  + velocity.x);
console.log(climb);
  position.x += climb;
  velocity.x = position.x - oldPos.x;


  // calculate shape/position of DOM node vector plot
  var domHeight = Math.abs(position.x - oldPos.x);
  var domWidth = Math.abs(position.y - oldPos.y);
  var domTop = position.x;
  var domLeft = position.y - domWidth;

  // dom manipulation
  var dot = document.createElement("div")
  dot.classList.add("dot");
  if (velocity.x >= 0) {
    dot.classList.add("dot-ascending");
  } else {
    dot.classList.add("dot-descending");
  }
  var top = "top: " + convertToXPos(domTop, position.y) + "px;";
  var left = "left:" + convertToYPos(domLeft) + "px;";
  var width = "width:" + convertToWidth(domWidth) + "px;";
  var height = "height:" + domHeight + "px;";
  var style =  top + left + width + height;
  dot.setAttribute("style", style)
  world.appendChild(dot);


  flightCalculations();


  if(t>=maxTime) {
    showFinalStats();
  } else if (position.x < 0) {
    if (velocity.x <= -1) {
      crash(dot, "Hit the ground too hard.");
    } else if (velocity.x < 1) {
      // Landed, or haven't taken off yet
      console.log("Landed, or haven't taken off yet")
    position.x = 0;
      plotRocketAt(t++);
    }
  } else {
    showFlightStats(t);
    plotRocketAt(t);
  }
}
window.scrollTo( 0, worldHeight );
function crash(dot, reason){
      // Crashed!
      console.log("Crashed! " + reason)
      dot.classList.add("dot-crash");
      if(position.x < 0) {
        var style = "top: " + convertToXPos(0) + "px; left: " + convertToYPos(position.y) + "px;";
        dot.setAttribute("style", style);
      }
    showFinalStats();
}
function convertToXPos(x, y){
  return ((x * -1) / 1) + worldHeight;
}
const yScale = 100;
function convertToYPos(y){
  y = y/yScale;
  return (y % 10000) + 50;
}
function convertToWidth(y) {
  return y/yScale;
}
var flightCalculations = function(t) {
  if(position.x > maxHeight) {
    maxHeight = position.x;
  }
  if(velocity.x > maxVelocity.x) {
    maxVelocity.x = velocity.x;
  }
}
var oldVVelocity = 0;
var oldHVelocity = 0;
var oldHeight = 0;
var oldRange = 0;
var heightGain = .14159;
var showFlightStats = function(t) {
  console.group("T+" + t);
  console.log("Fuel    : ", fuelMass);
  console.log("TWR     : ", thrust.x/(weight*-1));

  console.log("V-Height   : ", position.x);
  console.log("V-Thrust   : ", thrust.x);
  console.log("V-Velocity : ", velocity.x);

  console.log("H-Range      : ", position.y);
  console.log("H-Thrust     : ", thrust.y);
  console.log("H-Velocity   : ", velocity.y);

  console.log("V-Acclrtn       : ", velocity.x - oldVVelocity);
  console.log("Speed           : ", position.y - oldRange);
  heightGain = position.x - oldHeight;
  console.log("Height-Gain     : ", position.x - oldHeight);
  console.groupEnd();
  //dot.classList.add("dot-final");

  oldVVelocity = velocity.x;
  oldHVelocity = velocity.y;
  oldHeight = position.x;
  oldRange = position.y;
}
var showFinalStats = function(t) {
console.log("==============");
  console.log("Fuel    : ", fuelMass);
  console.log("TWR     : ", thrust.x/(weight*-1));
  console.log("Velocity: ", velocity.x);
  console.log("Height  : ", position.x);
  console.log("Highest point reached  : ", maxHeight);
  console.log("Fastest speed reached  : ", maxVelocity.x);
  //dot.classList.add("dot-final");

  // place max height line
  var heightLine = document.createElement("div")
  heightLine.classList.add("max-height");
  heightLine.setAttribute("style", "top: " + convertToXPos(maxHeight) + "px;");
  world.appendChild(heightLine);
}

const targetVSpeed =
var rollProgram = function(altitude, velocity) {

  var climbSpeed = velocity.x;
  var speed = velocity.y;
  var x = altitude + (heightGain * (climb + 1));

  if(climbSpeed >= targetVSpeed) {
    return {x: 0, y:1, type: "percent"};

  }

  // returns an object containing what percent of thrust should go in the x and y direction (always needs to add to 100)
  if (altitude < 199) {
    return {x: 1, y:0, type: "percent"};
  }

  return {x: .5, y:.5, type: "percent"};

  if (altitude < 200) {




    if(velocity.x > 10) {
      return {x: .1, y:.9, type: "percent"};
    }
    return {x: 0.99, y:0.01, type: "percent"};
  } else if (altitude < 300) {
    if(velocity.x > 10) {
      return {x: .1, y:.9, type: "percent"};
    }
    return {x: 0.95, y:0.05, type: "percent"};
  } else if (altitude < 400) {
    if(velocity.x > 10) {
      return {x: 0, y:1, type: "percent"};
    }
    return {x: 0.9, y:0.1, type: "percent"};
  } else if (altitude < 500) {
    if(velocity.x > 10) {
      return {x: 0, y:1, type: "percent"};
    }
    return {x: 0.6, y:0.4, type: "percent"};
  } else if (altitude < 600) {
    if(velocity.x > 10) {
      return {x: 0, y:1, type: "percent"};
    }
    return {x: 0.4, y:0.6, type: "percent"};
  } else if (altitude < 680) {
    if(velocity.x > 10) {
      return {x: 0, y:1, type: "percent"};
    }
    return {x: 0.3, y:0.7, type: "percent"};
  } else if (altitude < 750) {
    if(velocity.x > 10) {
      return {x: 0, y:1, type: "percent"};
    }
    return {x: 0.1, y:0.9, type: "percent"};
  } else {
    var deltaVToOrbit = escapeVelocity - speed;
    if (deltaVToOrbit < maxThrust){ // if we use max thrust we will overshoot

      // We're very close, so let's bleed off any vertical velocity (by coasting) before honing in on orbital speed
      if (velocity.x > 1) {
        return {yExact: 0, type: "exact"};
      }
      // bleed off any decimals to avoid javascript math errors
      var decimals = deltaVToOrbit % 1;
      var thrust = (decimals === 0) ? deltaVToOrbit : Math.floor(deltaVToOrbit/2) + decimals;

      return {yExact: thrust, type: "exact"};
    }
    return {x: 0, y:1, type: "percent"};
  }
};
var changeWind = function(altitude){
  var direction = (Math.floor(Math.random() * 2)) ? 1 : -1;
  var change = Math.random() * direction;
  wind += change;

  // reduce windd at altitude
  if (altitude < 200) {
    wind = wind/2;
  } else if (altitude < 600) {
    wind = wind/3;
  } else if (altitude < 700) {
    wind = wind/4;
  } else if (altitude < 750) {
    wind = wind/6;
  } else if (altitude < 800) {
    wind = wind/8;
  } else if (altitude < 900) {
    wind = wind/16;
  } else {
    wind = 0;
  }
}

  // account for curvature of earth by adding height based on range
  // var curvatureAdjustment = function(range) {
  //   var orbits = range/3074.688694454846;
  //   return orbits;
  //   //return range / 217016.5;
  // };


plotRocketAt(0);