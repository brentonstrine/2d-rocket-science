import ShipLayer from './ShipLayer.js';

class Viewport {
  constructor () {
    this.width = 1000; // is not scaled
    this.height = 500; // is not scaled
    this.offset = {x: 0, y: 0};//how far from the default the viewport is panned, a.k.a., where we're looking.
    this.scale = .1;

    // set up DOM element
    this.container = document.querySelector(".viewport-container");
    this.container.style.height = this.height + "px";
    this.container.style.width = this.width + "px";

    // registry of all active canvases in viewport
    this.canvases = [];

  }

  associatePlanetLayer(layer) {
    this.planetLayer = layer;
  }

  //correct the x coordinates
  // this takes the absolute x coordinate and returns the viewport coordinates, taking into account scale (zoom) and offset (pan)
  cx(x){
    return Math.round((x * this.scale) + this.offset.x);
  }

  // correct the y coordinates
  // this takes the absolute x coordinate and returns the viewport coordinates, taking into account scale (zoom) and offset (pan)
  cy(y){
    return Math.round((-y * this.scale) + this.offset.y + this.height);
  }

  s(d) {
    return Math.ceil(d * this.scale);
  }

  // how far away is the center of the viewport from the center of the planet?
  getViewportAbsoluteLocation(){
    return {
      // x: (this.offset.x),
      // y: (this.offset.y),

      x: (this.offset.x - 500) / -this.scale,
      y: (this.offset.y + 250) / this.scale,
      type: "coordinates",
    };
  }

  panTo(object, location) {
      if(object.type === "crosshair") {
        // go to crosshairs
        let hairs = this.planetLayer.crosshairs[object.c]
        hairs.x = (1/this.scale) * hairs.x;
        hairs.y = (1/this.scale) * hairs.y;
        this.panTo(hairs);
        this.rerenderViewport();
      } else if(object.type === "ship") {
        // center on ship
        this.offset.x = object.position.x;
        this.offset.y = object.position.y;
      } else if(object.type === "cursor" || object.type === "coordinates") {
        // center on ship
        this.offset.x = object.x;
        this.offset.y = object.y;
      } else if (location === "center") {
        // Planet center is centered
        this.offset.x = this.width/2;
        this.offset.y = this.height/-2;
      } else if (location === "surface") {
        // 50 pixels below the surface
        this.offset.x = this.width/2;//centered on planet
        this.offset.y = this.s(object.height) - 50;
      } else if (location === "launchpad") {
         // Launch point is centered
         this.offset.x = this.width/2;
         this.offset.y = this.s(object.height) - this.height/2;
      }
  }

  panLeft(amount) {
    amount = (amount && typeof amount === "number") ? amount : 1;
    this.offset.x += amount;
    this.rerenderViewport();
  }

  panRight(amount) {
    amount = (amount && typeof amount === "number") ? amount : 1;
    this.offset.x -= amount;
    this.rerenderViewport();
  }

  panUp(amount) {
    amount = (amount && typeof amount === "number") ? amount : 1;
    this.offset.y += amount;
    this.rerenderViewport();
  }

  panDown(amount) {
    amount = (amount && typeof amount === "number") ? amount : 1;
    this.offset.y -= amount;
    this.rerenderViewport();
  }

  rescale(factor) {
      let startingAbsoluteLocatoin = this.getViewportAbsoluteLocation();
      this.scale *= factor;
      let scaledAbsoluteLocation = this.getViewportAbsoluteLocation();
      let adjustment = {
        x: this.s(scaledAbsoluteLocation.x - startingAbsoluteLocatoin.x),
        y: -this.s(scaledAbsoluteLocation.y - startingAbsoluteLocatoin.y),
      }
      this.panLeft(adjustment.x);
      this.panUp(adjustment.y);
      if(this.showCrosshairs){
        console.log("start position", startingAbsoluteLocatoin);
        console.log("scale position", scaledAbsoluteLocation);
        console.log("adjustposition", adjustment);
        console.log("final position", this.offset);
      }
      this.rerenderViewport();
  }

  zoomIn(factor) {
    factor = factor || 1.1;
    this.rescale(factor);
  }

  zoomOut(factor) {
    factor = factor || 0.9;
    this.rescale(factor);
  }

  rerenderViewport() {
    // rerender each canvase in viewport
    for(var canvas of this.canvases) {
      canvas.clear();
      canvas.drawLayer();
    }
  }

  getViewportData() {
    debugger;
  }
};

export default Viewport;
