class Planet {
  constructor(name, layer) {

      var planets = {
        earth: {
          height: 50000,
          gravity: -1,
        }
      };

      var planet = planets[name];
      this.height = planet.height;
      this.gravity = planet.gravity;
      this.layer = layer;
      this.layer.associatePlanet(this);
  }

}
