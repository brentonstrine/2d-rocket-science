import Viewport from './Viewport.js';
import Ship from './Ship.js';
import PLANETS from './planets.js';
import PlanetLayer from './PlanetLayer.js';
import UILayer from './UILayer.js';


class Session {
  constructor(settings={}) {
    // set up default settings
    this.planetName = settings.planet || "earth"
    this.planet = PLANETS[this.planetName];
    this.flightType = settings.flightType || "on-the-fly";

    // build major objects
    this.viewport = new Viewport();
    this.planetLayer = new PlanetLayer(this.viewport, this.planet);
    this.ship = new Ship(this.planet, this.viewport);
    this.ui = new UILayer(this.viewport, this.ship);

    //starting defaults for this session
    this.ui.updateTimewarp(100);
    this.viewport.panTo(this.planet, "surface");

    this.viewport.rerenderViewport();
    this.ship.launch(this.flightType, this.ship, this.ui);
  }
}

//initialize on load
document.addEventListener("DOMContentLoaded", new Session());
