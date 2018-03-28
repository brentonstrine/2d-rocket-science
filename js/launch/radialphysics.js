window.RocketScience = window.RocketScience || {};

var v = RocketScience.vector || (function(){debugger;})();
var AvgType = RocketScience.PerformanceTracking || (function(){debugger;})();
var onScreenAvg = new AvgType("onscreen");
var offScreenAvg = new AvgType("offscreen");
var rollProgram = RocketScience.rollProgram || (function(){debugger;})();
var shipLayer = RocketScience.shipLayer;
var worldLayer = RocketScience.worldLayer;
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


// logistical vars
var time = 0;
var count = 0;
var step = 10000;
var timewarp = 100;

window.plotBatchManual = function plotBatch() {
  document.removeEventListener("click", plotBatch);
  plotBatch();
  document.addEventListener("click", plotBatch);
  console.log("Click to continue.");
};

window.plotBatch = function plotBatch() {
  // was getting into call stack size issues due to tail recursion when using a self-referencing function. so using a loop instead.
  for (var i = 0; i<step; i++){
    plotPosition();
  }
  //console.log('batch at ' + time);
};

window.plotPosition = function plotPosition() {
  time++;
  ship.updatePosition();
  if(shipLayer.isVisible()) {
    shipLayer.render();
    onScreenAvg.avg();
    //console.log(time, "onscreen", position.x);
  } else {
    shipLayer.logMoment();
    offScreenAvg.avg();
    if(time%100===1){
    //console.log(time, "offscreen", position.x);
    }
  }
  //console.log(time);
};
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
    step = 40;
    timewarp = warp;
    text = "Timewarp: " + step*100 + "x"
  } else {
    // every 100ms, do a batch whose size increases as the negative timewarp increases
    step = Math.round(Math.abs(warp) * 100);
    timewarp = Math.round(warp);
    text = "Timewarp: " + step*100 + "x";
  }

  // display warp factor in UI
  ui.setTimewarpText(text);
  ui.render();
};

window.plotRealTime = function plotRealTime() {
  plotPosition();
  if (Math.sign(timewarp) > 0) {
    setTimeout(plotRealTime, timewarp);
  } else {
    // every 100ms, do a batch whose size increases as the negative timewarp increases
    plotBatch();
    setTimeout(plotRealTime, 100);
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  renderTools.viewport("surface");
  shipLayer.setup();
  worldLayer.setup();
  ui.setup();
  ui.init();
  worldLayer.render();
  // plotBatchManual();
  plotRealTime();

  //var orbitalSpeed = orbitalMechanics.findOrbitalSpeed(500, 10);
  //log(orbitalSpeed);
});

