window.RocketScience = window.RocketScience || {};

(function Ship () {


  RocketScience.Ship = function (planet) {
      // private
      var defaultXVelocity =  1;//314.8769602565012;//225.1343073610617;
      var baseThrust = 2;
      var gimbalOrder = null;
      var defaultThrust = {x:baseThrust*0, y:baseThrust*1}; // straight up
      var defaultPosition = {x:0, y: planet.height}; // "top" of planet
      var defaultVelocity = {x:defaultXVelocity, y:0};

      // Ship vars
      this.fuel = baseThrust * 400;
      this.position = defaultPosition;
      this.position.previous = this.position;

      this.velocity = defaultVelocity;
      this.thrust = defaultThrust;

      // set the direction of the gimbal in the next tick
      this.gimbal = function(direction){
        gimbalOrder = direction;
      };

      // determine thrust for next tick
      this.calculateThrust = function () {
        // no thrust if not enough fuel
        var totalThrust = this.thrust.x + this.thrust.y;
        if (this.fuel > totalThrust) {
          shipLayer.setDotColor("green");
          this.fuel = this.fuel - totalThrust;
        } else {
          shipLayer.setDotColor("red");
          this.thrust.x = 0;
          this.thrust.y = 0;
          return;
        }

        var prograde = v.subtract(this.position, this.position.previous);
        if (gimbalOrder){
          if (gimbalOrder === "port") {
            this.thrust = v.getPort(prograde);
          } else if (gimbalOrder === "starboard") {
            this.thrust = v.getStarboard(prograde);
          }
          this.thrust = v.setMagnitude(this.thrust, baseThrust);
          gimbalOrder = false;
        } else {
          if (v.hasMagnitude(prograde.x)) {
            this.thrust = v.setMagnitude(prograde, baseThrust);
          }
        }
        this.fuel -= baseThrust;
        //console.log("fuel: " + this.fuel);

        // var thrustAdjustment = RocketScience.rollProgram(this.position.y - planet.height, this.velocity);
        //
        // if(thrustAdjustment.type === "exact") {
        //   this.thrust.x = thrustAdjustment.xExact;
        //   var percentOfMaxThrust = this.thrust.y / maxThrust;
        // } else if(thrustAdjustment.type === "percent") {
        //   this.thrust.x = totalThrust * thrustAdjustment.x;
        //   this.thrust.y = totalThrust * thrustAdjustment.y;
        // }
      };

      this.updatePosition = function () {
        this.calculateThrust();
        //calculateNav();
        //console.log(this.thrust);

        var gravityVector = v.getGravity();

        // log current velocity
        this.position.previous = {x: this.position.x, y: this.position.y};

        // update velocity
        this.velocity.x = this.velocity.x + this.thrust.x + gravityVector.x;
        this.velocity.y = this.velocity.y + this.thrust.y + gravityVector.y;

        // update position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //show position
        //console.log("x: " + renderTools.cx(this.position.x), "y: " + renderTools.cy(this.position.y));
      };
  };
}());