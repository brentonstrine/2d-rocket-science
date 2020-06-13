window.RocketScience = window.RocketScience || {};

//var v = RocketScience.vector || (function(){})();

import Viewport from './Viewport.js';
import Ship from './ship.js';
import ShipLayer from './ShipLayer.js';
import Planet from './Planet.js';
import PlanetLayer from './PlanetLayer.js';
import UILayer from './UILayer.js';
// window.AvgType = RocketScience.PerformanceTracking || (function(){})();
// window.onScreenAvg = new AvgType("onscreen");
// window.offScreenAvg = new AvgType("offscreen");
// window.rollProgram = RocketScience.rollProgram || (function(){})();
//window.projectionLayer = RocketScience.projectionLayer;
//var projectionPrograde = new RocketScience.Ship(planet); // I think this was a projection to show what would happen if you moved prograde at a given instant
//window.orbitalMechanics = RocketScience.orbitalMechanics();

let timediff = new Date();


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


window.initialize2dRocketScience = function() {
  //create a viewport to use
  window.viewport = new Viewport();

  var earthLayer = new PlanetLayer(viewport);
  window.actualShipLayer = new ShipLayer(viewport);
  var earth = new Planet("earth", earthLayer);
  window.actualShip = new Ship(earth, actualShipLayer);
  var ui = new UILayer(viewport, actualShip)


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
  ui.timewarp = 100;

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

  console.log("myPlanet ",actualShip.planet)
  //actualShip.plotBatchManual();
  plotOnTheFly(actualShip, ui);
}

function plotOnTheFly(actualShip, ui) {
  // set how frequently we replot and whether that's a single plot or a batch plot
  // some of this logic is very similar to UILayer::updateTimewarp(), but
  if (Math.sign(ui.timewarp) > 0) {
    actualShip.drawPosition();
    setTimeout(function(){plotOnTheFly(actualShip, ui)}, ui.timewarp);// smaller values of timewarp are "faster" time because timewarp is how often the timeout repeats
  } else {
    // when timewarp is below 1 (1ms) then we start doing a batch of plots each repeat instead of only plotting a single move each repeat
    actualShip.plotBatch();
    setTimeout(function(){plotOnTheFly(actualShip, ui)}, 10);
    let now = new Date();
    console.log("Batchplot!", now - timediff, "ms");
    timediff = now;
  }
};

//initialize on load
document.addEventListener("DOMContentLoaded", initialize2dRocketScience());
