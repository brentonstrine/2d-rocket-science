window.RocketScience = window.RocketScience || {};

//var v = RocketScience.vector || (function(){})();

import Viewport from './Viewport.js';
import Ship from './ship.js';
import ShipLayer from './ShipLayer.js';
import PlanetLayer from './PlanetLayer.js';
import UILayer from './UILayer.js';
import userInterface from './userInterface.js';
// window.AvgType = RocketScience.PerformanceTracking || (function(){})();
// window.onScreenAvg = new AvgType("onscreen");
// window.offScreenAvg = new AvgType("offscreen");
// window.rollProgram = RocketScience.rollProgram || (function(){})();
//window.projectionLayer = RocketScience.projectionLayer;
//var projectionPrograde = new RocketScience.Ship(planet); // I think this was a projection to show what would happen if you moved prograde at a given instant
window.orbitalMechanics = RocketScience.orbitalMechanics();


window.plotBatchManual = function plotBatch() {
  debugger;
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
//   if(this.layer.isShipVisible()) {
//     this.layer.drawLayer(ship);
//     onScreenAvg.avg();
//     //console.log(ship.time, "onscreen", position.x);
//   } else {
//     this.layer.logMoment(ship);
//     offScreenAvg.avg();
//     if(ship.time%100===1){
//     //console.log(ship.time, "offscreen", position.x);
//     }
//   }
//
//   //console.log(ship.time);
// };

window.updateTimewarp = function updateTimewarp(warp) {
  var text;

  if (Math.sign(warp) === 1) {
    if (warp > 1000) {
      window.timewarp = 1000;
    } else {
      window.timewarp = Math.round(warp);
    }
    text = "Timewarp: " + Math.round(1000/window.timewarp) + "x";
  } else if (Math.sign(warp) === 0) {
    ship.step = 40;
    window.timewarp = warp;
    text = "Timewarp: " + ship.step*100 + "x"
  } else {
    // every 100ms, do a batch whose size increases as the negative timewarp increases
    ship.step = Math.round(Math.abs(warp) * 100);
    window.timewarp = Math.round(warp);
    text = "Timewarp: " + ship.step*100 + "x";
  }

  // display warp factor in UI
  ui.setTimewarpText(text);
  ui.drawLayer();
};

window.plotRealTime = function plotRealTime() {
  window.actualShip.plotPosition();
  if (Math.sign(window.timewarp) > 0) {
    setTimeout(window.plotRealTime, window.timewarp);
  } else {
    // every 100ms, do a batch whose size increases as the negative timewarp increases
    ship.plotBatch();
    setTimeout(window.plotRealTime, 100);
  }
};

window.initialize2dRocketScience = function() {
  //create a viewport to use
  window.viewport = new Viewport();

  //create various canvas layers in viewport
  var earthLayer = new PlanetLayer(viewport);
  window.actualShipLayer = new ShipLayer(viewport);
  window.ui = new UILayer(viewport);

  //create objects associated with layers
  var earth = new Planet("earth", earthLayer);
  window.actualShip = new Ship(earth, actualShipLayer);

  // Relative Directions
  window.nav = {
    // planet-relative
    down: {x:null, y:null, m:null,},
    up: {x:null, y:null, m:null,},
    clockwise: {x:null, y:null, m:null,},
    anticlockwise: {x:null, y:null, m:null,},

    // ship-relative
    prograde: {x:null, y:null, m:null},
    retrograde: {x:null, y:null, m:null},
  };

  // logistical vars
  window.count = 0;//what are we counting?
  window.timewarp = 100;

  window.viewport.panTo(earth, "surface");
  //ShipLayer.setup();
  //projectionLayer.setup();
  //worldLayer.setup();
  //ui.setup();
  ui.init();
  //worldLayer.drawLayer();
  // plotBatchManual();


viewport.rerenderViewport();
  //auto-launch
  plotRealTime();
}

window.launch = function() {

  plotRealTime();
  //var orbitalSpeed = orbitalMechanics.findOrbitalSpeed(500, 10);
  //log(orbitalSpeed);
}

//initialize on load
document.addEventListener("DOMContentLoaded", initialize2dRocketScience());
