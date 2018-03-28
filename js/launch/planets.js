window.RocketScience = window.RocketScience || {};
(function () {
  var planets = {
    green: {
      height: 50000,
      gravity: -1,
    }
  };

  RocketScience.Planet = function (name) {
    var planet = planets[name];
    this.height = planet.height;
    this.gravity = planet.gravity;
  }
}());