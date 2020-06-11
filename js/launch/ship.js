import ShipLayer from './ShipLayer.js';
import VectorUtils from './vector-utils.js';


var Ship =  function (planet, layer) {
    this.type = "ship";
    this.planet = planet;

    // private
    var defaultXVelocity =  1;//314.8769602565012;//225.1343073610617;
    var baseThrust = 2;
    var gimbalOrder = null;
    var defaultThrust = {x:baseThrust*0, y:baseThrust*1}; // straight up
    var defaultPosition = {x:0, y: this.planet.height+1}; // "top" of planet
    var defaultVelocity = {x:defaultXVelocity, y:0};

    // Ship vars
    this.time = 0;
    this.fuel = baseThrust * 400;
    this.position = defaultPosition;
    this.position.previous = this.position;

    this.velocity = defaultVelocity;
    this.thrust = defaultThrust;
    this.throttle = 1;

    // Rendering vars
    layer.plotLineColor = "#333333";
    this.shipType = "real";
    this.layer = layer;
    this.step = 10000;

    this.layer.associateShip(this);

    // this.init = function () {
    //   // prevent modified objects from modifying prototype parent
    //   this.position = {
    //     x: this.position.x,
    //     y: this.position.y,
    //   };
    // };

    // set the direction of the gimbal in the next tick
    this.gimbal = function(direction){
      gimbalOrder = direction;
    };

    this.plotBatch = function plotBatch() {

      if (VectorUtils.getMagnitude(this.position) <= this.planet.height) {
        return;
      }
      for (var i = 0; i<this.step; i++){
        this.plotPosition();
      }

    };

    this.plotPosition = function plotPosition() {

      if (VectorUtils.getMagnitude(this.position) <= this.planet.height) {
        return;
      }
      this.time++;
      // if(this.shipType === "real"){
      //   if(projectionPrograde) {
      //     debugger;
      //   }
      //     var projectionPrograde = Object.create(ship);
      //     projectionPrograde.plotLineColor = "#eeeeff";
      //     projectionPrograde.time--;
      //     projectionPrograde.fuel--;
      //     projectionPrograde.shipType = "plot";
      //     projectionPrograde.layer = projectionLayer;
      //     projectionLayer.clear();
      //     projectionLayer.clearHistory();
      //     projectionPrograde.plotBatch(500);
      // }

      this.updatePosition();

      if(this.layer.isShipVisible(this)) {
        this.layer.drawLayer(this);
        //onScreenAvg.avg();
        //console.log(this.time, "onscreen", position.x);
      } else {
        this.layer.logMoment(this);
        //offScreenAvg.avg();
        if(this.time%100===1){
        //console.log(this.time, "offscreen", position.x);
        }
      }

    };

    this.updatePosition = function () {
      //
      // if(this.shipType !== "real" && this.time === ship.time) {
      //   //if(this.fuel !== (ship.fuel+1) {debugger;}
      //   if(this.velocity.x !== ship.velocity.x) {debugger;}
      //   if(this.velocity.y !== ship.velocity.y) {debugger;}
      //   if(this.position.x !== ship.position.x) {debugger;}
      //   if(this.position.y !== ship.position.y) {debugger;}
      //   if(this.thrust.x !== ship.thrust.x) {debugger;}
      //   if(this.thrust.y !== ship.thrust.y) {debugger;}
      // };
      this.calculateThrust();
      //calculateNav();
      //console.log(this.thrust);

      var gravityVector = VectorUtils.getGravity(this.position, this.planet);

      // update velocity
      this.velocity = {
        x: this.velocity.x + (this.thrust.x * this.throttle) + gravityVector.x,
        y: this.velocity.y + (this.thrust.y * this.throttle) + gravityVector.y,
      };

      //update position
      this.position = {
        previous: {x: this.position.x, y: this.position.y},
        x: this.position.x + this.velocity.x,
        y: this.position.y + this.velocity.y,
      };



      //show position
      //console.log("x: " + RenderingTools.cx(this.position.x), "y: " + RenderingTools.cy(this.position.y));
    };

    // determine thrust for next tick
    this.calculateThrust = function () {
      // no thrust if not enough fuel
      var totalThrust = this.thrust.x + this.thrust.y;
      if (this.fuel > totalThrust) {
        this.layer.setDotColor("green");
        this.fuel = this.fuel - totalThrust;
      } else {
        this.layer.setDotColor("red");
        this.thrust = {
          x: 0,
          y: 0,
        };
        return;
      }

      var prograde = VectorUtils.subtract(this.position, this.position.previous);
      if (gimbalOrder && this.shipType === "real"){
        if (gimbalOrder === "port") {
          this.thrust = VectorUtils.getPort(prograde);
        } else if (gimbalOrder === "starboard") {
          this.thrust = VectorUtils.getStarboard(prograde);
        }
        this.thrust = VectorUtils.setMagnitude(this.thrust, baseThrust);
        gimbalOrder = false;
      } else {
        if (VectorUtils.hasMagnitude(prograde.x)) {
          this.thrust = VectorUtils.setMagnitude(prograde, baseThrust);
        }
      }
      this.fuel -= baseThrust;
      //console.log("fuel: " + this.fuel);

      // var thrustAdjustment = RocketScience.rollProgram(this.position.y - this.planet.height, this.velocity);
      //
      // if(thrustAdjustment.type === "exact") {
      //   this.thrust.x = thrustAdjustment.xExact;
      //   var percentOfMaxThrust = this.thrust.y / maxThrust;
      // } else if(thrustAdjustment.type === "percent") {
      //   this.thrust.x = totalThrust * thrustAdjustment.x;
      //   this.thrust.y = totalThrust * thrustAdjustment.y;
      // }
    };

};

export default Ship;
