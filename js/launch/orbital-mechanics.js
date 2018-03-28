window.RocketScience = window.RocketScience || {};

(function render () {
  RocketScience.orbitalMechanics = function () {
    var bestTime = 0;
    var lastImprovement = 0;
    var lastVelocity = 0;
    var workingVelocity = 1;
    var lastHigh = 0;
    var lastLow = 0;
    var attempts = 0;

    var getHalfway = function(high,low){
      if (low === 0) {
        return (high *= .8);
      } else if (high === 0) {
        return (low *= 1.2);
      }

      var dist = (high-low)/2;
      var newVelocity = low+dist;

      return newVelocity;
    }

    return {
      findOrbitalSpeed: function(targetAltitude, buffer){

        position = {x:0, y: planet.height + targetAltitude};

        var reset = function(){
          time = 0;
          position = {x:0, y: planet.height + targetAltitude};
          position.previous = position;
          workingVelocity = getHalfway(lastHigh, lastLow);
          velocity.x = workingVelocity;
          velocity.y = 0
          count = 0;
          attempts++;
        };

        velocity.y = 0;

        for (var i = 0; i<step; i++){
          velocity.x = workingVelocity;
          plotPosition();
          var altitude = v.getMagnitude(position) - planet.height;
          //log(altitude, position);

          if(i > bestTime) {
            bestTime = i;
          }

          if(altitude < targetAltitude - buffer) {
            console.log("L " + i + "/" + bestTime, "current: " + workingVelocity, "lastHigh:" + lastHigh + " lastLow:" +  lastLow + " d:" + difference);
//if(workingVelocity <= lastLow){debugger;}
            lastLow = workingVelocity;
            reset();

            var difference = workingVelocity - lastVelocity;
            //log(workingVelocity, lastVelocity, difference, workingVelocity===lastVelocity)

            if (difference === 0) {
              //debugger;
              return workingVelocity;
            }

            lastVelocity = workingVelocity;
          } else if (altitude > targetAltitude + buffer) {
            console.log("H " + i + "/" + bestTime, "current: " + workingVelocity, "lastHigh:" + lastHigh + " lastLow:" +  lastLow + " d:" + difference);
//if(workingVelocity >= lastHigh){debugger;}
            lastHigh = workingVelocity;
            reset();

            var difference = workingVelocity - lastVelocity;
            //log(workingVelocity, lastVelocity, difference, workingVelocity===lastVelocity)

            if (difference === 0) {
              //debugger;
              return workingVelocity;
            }

            lastVelocity = workingVelocity;
          }
        }
        return false;
      },
    };

    RocketScience.calculateNav = function() {
        count++;
        nav.down = v.getGravity();
        nav.up = v.getReverse(nav.down);
        nav.clockwise = v.getStarboard(nav.up);
        nav.anticlockwise = v.getPort(nav.up);
        nav.prograde = v.subtract(position, position.previous);
        nav.retrograde = v.getReverse(nav.prograde);
        nav.altitude = v.getMagnitude(position) - planet.height;
    };
  };
}());