import CanvasLayer from './CanvasLayer.js';

class UILayer extends CanvasLayer {
  constructor(viewport, ship) {
    super(viewport);
    this.timewarpText = "";
    this.timewarp = 1;
    this.ship = ship;
  }

  init(){
    if(this.timewarp>3500 || this.timewarp===0 || this.timewarp<0) { debugger; }
    this.updateTimewarp(this.timewarp);
    this.drawLayer();
    this.initControls();
  }

  drawLayer(){
    this.clear();

    // timewarp indicator
    this.textFixed(this.timewarpText, viewport.width - 100, viewport.height - 10);

    let debugMode = false;
    if (debugMode) {
      let x = Math.round(this.viewport.offset.x).toLocaleString('en');
      let y = Math.round(this.viewport.offset.y).toLocaleString('en');
      let offsetText = `${x}px, ${y}px`;
      this.textFixed(offsetText, viewport.width - 100, viewport.height - 25);

      let d = this.viewport.getViewportAbsoluteLocation();
      let pdx = Math.round(d.x).toLocaleString('en');
      let pdy = Math.round(d.y).toLocaleString('en');

      let distanceText = `d: ${pdx}px, ${pdy}px`;
      this.textFixed(distanceText, viewport.width - 115, viewport.height - 40);

      this.textFixed("viewport center", 600, 270);
      this.fillStyle ("red");
    }
  }

  setTimewarpText(text) {
    this.timewarpText = text;
  }

  updateTimewarp(warp) {
    var text;

    // Note: counterintuitively, smaller values of `this.timewarp` mean warping through time faster, since this is the "timeout" interval

    if (Math.sign(warp) === 1) {
      if (warp > 1000) {
        this.timewarp = 1000;
      } else {
        this.timewarp = Math.round(warp);
      }
      text = "Timewarp: " + Math.round(1000/this.timewarp) + "x";
    } else if (Math.sign(warp) === 0) {
      this.ship.step = 40;
      this.timewarp = warp;
      text = "Timewarp: " + this.ship.step*100 + "x"
    } else {
      // every 100ms, do a batch whose size increases as the negative timewarp increases
      this.ship.step = Math.round(Math.abs(warp) * 100);
      this.timewarp = Math.round(warp);
      text = "Timewarp: " + this.ship.step*100 + "x";
    }

    // display warp factor in UI
    this.setTimewarpText(text);
    this.drawLayer();
  };

  initControls() {
    var controls = document.querySelector(".viewport-controls ")
    var zoomInBtn = controls.querySelector(".zoom-in");
    var zoomOutBtn = controls.querySelector(".zoom-out");
    var leftBtn = controls.querySelector(".left");
    var rightBtn = controls.querySelector(".right");
    var upBtn = controls.querySelector(".up");
    var downBtn = controls.querySelector(".down");

    zoomInBtn.addEventListener("click", function(){this.viewport.zoomIn();}.bind(this));
    zoomOutBtn.addEventListener("click", function(){this.viewport.zoomOut();}.bind(this));
    leftBtn.addEventListener("click", function(){this.viewport.panLeft();}.bind(this));
    rightBtn.addEventListener("click", function(){this.viewport.panRight();}.bind(this));
    upBtn.addEventListener("click", function(){this.viewport.panUp();}.bind(this));
    downBtn.addEventListener("click", function(){this.viewport.panDown();}.bind(this));

    document.addEventListener("keydown", function(e){
      //log(e.keyCode);
      if (e.keyCode == 187) {        // plus
        return this.viewport.zoomIn();
      } else if (e.keyCode == 189) { // minus
        return this.viewport.zoomOut();
      } else if(e.keyCode == 37) {   // left arrow
        return this.viewport.panLeft();
      } else if (e.keyCode == 38) {  // up arrow
        return this.viewport.panUp();
      } else if (e.keyCode == 39) {  // right arrow
        return this.viewport.panRight();
      } else if (e.keyCode == 40) {  // down arrow
        return this.viewport.panDown();
      } else if (e.keyCode == 65) {  // a (port)
        this.ship.gimbal("port");
      } else if (e.keyCode == 68) {  // d (starboard)
        this.ship.gimbal("starboard");
      } else if (e.keyCode == 87) {  // w (throttle up)
        this.ship.throttle = 1;
      } else if (e.keyCode == 83) {  // s (throttle down)
        this.ship.throttle = 0;
      } else if (e.keyCode == 190) { // > (speed up time)
        var warp = this.timewarp - 1;
        warp *= 0.8;
        this.updateTimewarp(warp);
      } else if (e.keyCode == 188) { // < (slow time)
        var warp = this.timewarp + 1;
        warp *= 1.2;
        this.updateTimewarp(warp);
      }
    }.bind(this));

    this.canvasElement.addEventListener("wheel", function(e){
      if (e.shiftKey) {
        if (Math.sign(e.deltaY) === 1) {
          return this.viewport.zoomOut(0.99);
        } else if (Math.sign(e.deltaY) === -1) {
          return this.viewport.zoomIn(1.01);
        }
      } else {
        if (Math.sign(e.deltaY) === 1) {
          return this.viewport.panDown(e.deltaY/2);
        } else if (Math.sign(e.deltaY) === -1) {
          return this.viewport.panUp(Math.abs(e.deltaY/2));
        }
        if (Math.sign(e.deltaX) === 1) {
          return this.viewport.panRight(e.deltaX/2);
        } else if (Math.sign(e.deltaX) === -1) {
          return this.viewport.panLeft(Math.abs(e.deltaX/2));
        }
      }
    }.bind(this));
  };

}

export default UILayer;
