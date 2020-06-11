import CanvasLayer from './CanvasLayer.js';

class ShipLayer extends CanvasLayer {
  constructor (viewport) {
    super(viewport);
    this.history = [];
    this.dotW = 6;
    this.dotH = 6;
    this.dotColor = "green";
    this.plotLineColor = null;
  }

  drawLayer(ship) {
    this.fillStyle (this.dotColor);
    this.rect(ship.position.x-(this.dotW/2), ship.position.y+(this.dotH/2), this.dotW, this.dotH);
    this.strokeStyle(this.plotLineColor);
    this.line(ship.position.previous.x, ship.position.previous.y, ship.position.x, ship.position.y);
    this.fillStyle ("black");
    this.logMoment(ship);
    this.renderHistory();
  }

  logMoment(ship) {
      var moment = {
        position: {
          previous: ship.position.previous,
          x: ship.position.x,
          y: ship.position.y,
        },
        time: ship.time,
      };
      this.history.push(moment);
  }

  renderHistory() {
    for(var moment of this.history){
      this.fillStyle (this.dotColor);
      this.rect(moment.position.x-(this.dotW/2), moment.position.y+(this.dotH/2), this.dotW, this.dotH);
      this.strokeStyle(this.plotLineColor);
      this.line(moment.position.previous.x, moment.position.previous.y, moment.position.x, moment.position.y);
      this.fillStyle ("black");
    }
  }

  isShipVisible(ship) {
    viewport = this.viewport.getViewportData();
    var x = this.viewport.cx(ship.position.x);
    var y = this.viewport.cy(ship.position.y);
    var px = this.viewport.cx(ship.position.previous.x);
    var py = this.viewport.cy(ship.position.previous.y);
    var endPointOnscreen   = (  x >= 0 &&  x < viewport.width &&  y >= 0 &&  y < viewport.height);
    var startPointOnscreen = ( px >= 0 && px < viewport.width && py >= 0 && py < viewport.height);

    if (startPointOnscreen || endPointOnscreen) {
      return true;
    } else {
      return false;
    }
  }

  clearHistory() {
    this.history = [];
  }

  setDotColor(color) {
    this.dotColor = color;
  }
};
export default ShipLayer;
