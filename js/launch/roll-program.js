window.RocketScience = window.RocketScience || {};

(function rollProgram () {
  RocketScience.rollProgram = function(altitude, velocity) {

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


    RocketScience.gravityTurn = function(altitude, velocity) {

        return {y: 1, x:0, type: "percent"};
    };
}());