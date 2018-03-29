window.RocketScience = window.RocketScience || {};

var v = RocketScience.vector || (function(){})();
var AvgType = RocketScience.PerformanceTracking || (function(){})();
var onScreenAvg = new AvgType("onscreen");
var offScreenAvg = new AvgType("offscreen");
var rollProgram = RocketScience.rollProgram || (function(){})();
var shipLayer = RocketScience.shipLayer;
var worldLayer = RocketScience.worldLayer;
var projectionLayer = RocketScience.projectionLayer;
var ui = RocketScience.ui;
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

// instantiate important objects
var planet = new RocketScience.Planet("green");
var ship = new RocketScience.Ship(planet);
//var projectionPrograde = new RocketScience.Ship(planet);


// logistical vars
var count = 0;
var timewarp = 100;

window.plotBatchManual = function plotBatch() {
  document.removeEventListener("click", plotBatch);
  plotBatch();
  document.addEventListener("click", plotBatch);
  console.log("Click to continue.");
};

// window.plotBatch = function plotBatch() {
//   // was getting into call stack size issues due to tail recursion when using a self-referencing function. so using a loop instead.
//   for (var i = 0; i<ship.step; i++){
//     plotPosition();
//   }
//   //console.log('batch at ' + ship.time);
// };

// window.plotPosition = function plotPosition() {
//   ship.time++;
//   ship.updatePosition();
//
//   //
//   // log("ship", ship.fuel, ship.time, ship.position.y);
//   // log("proj", projectionPrograde.fuel, projectionPrograde.time, projectionPrograde.position.y);
//   //
//   //
//   // log(ship.position);
//   // log(projectionPrograde.position);
//
//   if(shipLayer.isVisible()) {
//     shipLayer.drawLayer(ship);
//     onScreenAvg.avg();
//     //console.log(ship.time, "onscreen", position.x);
//   } else {
//     shipLayer.logMoment(ship);
//     offScreenAvg.avg();
//     if(ship.time%100===1){
//     //console.log(ship.time, "offscreen", position.x);
//     }
//   }
//
//   //console.log(ship.time);
// };
window.updateTimewarp = function plotRealTime(warp) {
  var text;

  if (Math.sign(warp) === 1) {
    if (warp > 1000) {
      timewarp = 1000;
    } else {
      timewarp = Math.round(warp);
    }
    text = "Timewarp: " + Math.round(1000/timewarp) + "x";
  } else if (Math.sign(warp) === 0) {
    ship.step = 40;
    timewarp = warp;
    text = "Timewarp: " + ship.step*100 + "x"
  } else {
    // every 100ms, do a batch whose size increases as the negative timewarp increases
    ship.step = Math.round(Math.abs(warp) * 100);
    timewarp = Math.round(warp);
    text = "Timewarp: " + ship.step*100 + "x";
  }

  // display warp factor in UI
  ui.setTimewarpText(text);
  ui.drawLayer();
};

window.plotRealTime = function plotRealTime() {
  ship.plotPosition();
  if (Math.sign(timewarp) > 0) {
    setTimeout(plotRealTime, timewarp);
  } else {
    // every 100ms, do a batch whose size increases as the negative timewarp increases
    ship.plotBatch();
    setTimeout(plotRealTime, 100);
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  renderTools.viewport("surface");
  shipLayer.setup();
  projectionLayer.setup();
  worldLayer.setup();
  ui.setup();
  ui.init();
  worldLayer.drawLayer();
  // plotBatchManual();
  plotRealTime();

  //var orbitalSpeed = orbitalMechanics.findOrbitalSpeed(500, 10);
  //log(orbitalSpeed);
});

