import ShipLayer from './ShipLayer.js';

class Viewport {
  constructor () {
    this.width = 1000; // is not scaled
    this.height = 500; // is not scaled
    this.offset = {x: 0, y: 0};//how far from the default the viewport is panned, a.k.a., where we're looking.
    this.scale = .1;
    this.adjustedOffset = {x:0, y:0};
    //this.adjustedScale = this.scale; //not sure what this was but it's not being used

    // set up DOM element
    this.container = document.querySelector(".viewport-container");
    this.container.style.height = this.height + "px";
    this.container.style.width = this.width + "px";

    // registry of all active canvases in viewport
    this.canvases = [];

  }

  //correct the x coordinates
  cx(x){
    return Math.round((x * this.scale) + this.offset.x);
  }

  // correct the y coordinates
  cy(y){
    return Math.round((y * -1 * this.scale) + this.offset.y + this.height);
  }

  s(d) {
    return Math.ceil(d * this.scale);
  }

  panTo(object, location) {
      if(object.type === "ship") {
        // center on ship
        this.offset.x = object.position.x;
        this.offset.y = object.position.y;
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
    amount = (amount && typeof amount === "number") ? amount : 50;
    this.adjustedOffset.x = this.adjustedOffset.x - amount;
    this.rerenderViewport();
  }

  panRight(amount) {
    amount = (amount && typeof amount === "number") ? amount : 50;
    this.adjustedOffset.x = this.adjustedOffset.x + amount;
    this.rerenderViewport();
  }

  panUp(amount) {
    amount = (amount && typeof amount === "number") ? amount : 50;
    this.adjustedOffset.y = this.adjustedOffset.y - amount;
    this.rerenderViewport();
  }

  panDown(amount) {
    amount = (amount && typeof amount === "number") ? amount : 50;
    this.adjustedOffset.y = this.adjustedOffset.y + amount;
    this.rerenderViewport();
  }

  zoomIn(factor) {
    this.scale *= 1.1;
    this.rerenderViewport();
  }

  zoomOut() {
    this.scale *= 0.9;
    this.rerenderViewport();
  }

  rerenderViewport() {
    //set viewport offsets (pan)
    this.offset.x -= this.adjustedOffset.x;
    this.offset.y -= this.adjustedOffset.y;

    // rerender all canvases in viewport
    for(var canvas of this.canvases) {
      canvas.clear();
      canvas.drawLayer();
    }
  }

  getViewportData() {
    return {
      width: this.width,
      height: this.height,
    }
  }
};

export default Viewport;
