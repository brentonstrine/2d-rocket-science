import ShipLayer from './ShipLayer.js';
import VectorUtils from './vector-utils.js';
import Flight from './Flight.js';

class Ship {
  constructor(planet, viewport) {
    this.type = "ship";
    this.planet = planet;
    this.layer = new ShipLayer(viewport);
    this.defaultXVelocity =  1;
    this.baseThrust = 2;
    this.gimbalOrder = null;
    this.defaultThrust = {x: this.baseThrust*0, y: this.baseThrust*1}; // straight up
    this.defaultPosition = {x: 0, y: this.planet.height+1}; // "top" of planet
    this.defaultVelocity = {x: this.defaultXVelocity, y: 0};

    // Ship vars
    this.time = 0;
    this.fuel = this.baseThrust * 400;
    this.position = this.defaultPosition;
    this.position.previous = this.position;

    this.velocity = this.defaultVelocity;
    this.thrust = this.defaultThrust;
    this.throttle = 1;

    // Rendering vars
    this.layer.plotLineColor = "#333333";
    this.shipType = "real";
    this.step = 75;

    this.layer.associateShip(this);
  }

  launch(flightType, ship, ui) {
    this.flight = new Flight(ship, ui);
    if(flightType === "on-the-fly") {
      this.flight.onTheFly();
    } else if (flightType === "programmed") {
      //...
    }
  }

  // set the direction of the gimbal in the next tick
  gimbal(direction){
    this.gimbalOrder = direction;
  }

  plotBatchManual() {
  console.log("plotbatchmanual");
    this.plotBatch();
    document.addEventListener("click", this.plotBatch.bind(this));
    console.log("Click to continue.");
  };

  plotBatch() {
    if (VectorUtils.getMagnitude(this.position) <= this.planet.height) {
      return;
    }
    for (var i = 0; i<this.step; i++){
      this.updatePosition();
    }
    console.log(this.step);
    this.layer.drawLayer(this);
  }

  drawPosition() {
    this.updatePosition();

    if(this.layer.isShipVisible(this)) {
      this.layer.drawLayer(this);
    } else {
      console.log("not visible");
      if(this.time%100===1){
      }
    }
  }

  updatePosition() {
    if (VectorUtils.getMagnitude(this.position) <= this.planet.height) {
      // ship is below the surface.
      //this.flight.end();
      return;
    }
    this.time++;
    this.layer.logMoment(this);

    this.calculateThrust();

    let gravityVector = VectorUtils.getGravity(this.position, this.planet);

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
  }

  // determine thrust for next tick
  calculateThrust() {
    // no thrust if not enough fuel
    let totalThrust = this.thrust.x + this.thrust.y;
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

    let prograde = VectorUtils.subtract(this.position, this.position.previous);
    if (this.gimbalOrder && this.shipType === "real"){
      if (this.gimbalOrder === "port") {
        this.thrust = VectorUtils.getPort(prograde);
      } else if (this.gimbalOrder === "starboard") {
        this.thrust = VectorUtils.getStarboard(prograde);
      }
      this.thrust = VectorUtils.setMagnitude(this.thrust, this.baseThrust);
      this.gimbalOrder = false;
    } else {
      if (VectorUtils.hasMagnitude(prograde.x)) {
        this.thrust = VectorUtils.setMagnitude(prograde, this.baseThrust);
      }
    }
    this.fuel -= this.baseThrust;
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
  }
}
export default Ship;








// Relative Directions
// nav = {
//   // planet-relative
//   down: {x:null, y:null, m:null,},
//   up: {x:null, y:null, m:null,},
//   clockwise: {x:null, y:null, m:null,},
//   anticlockwise: {x:null, y:null, m:null,},
//
//   // ship-relative
//   prograde: {x:null, y:null, m:null},
//   retrograde: {x:null, y:null, m:null},
// };
// calculateNav(){
//   count++;
//   nav.down = v.getGravity();
//   nav.up = v.getReverse(nav.down);
//   nav.clockwise = v.getStarboard(nav.up);
//   nav.anticlockwise = v.getPort(nav.up);
//   nav.prograde = v.subtract(position, position.previous);
//   nav.retrograde = v.getReverse(nav.prograde);
//   nav.altitude = v.getMagnitude(position) - planet.height;
// }
