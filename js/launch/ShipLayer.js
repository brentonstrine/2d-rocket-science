import CanvasLayer from './CanvasLayer.js';

class ShipLayer extends CanvasLayer {
  constructor (viewport) {
    super(viewport);
    this.canvasElement.setAttribute("id", "ship-layer");
    this.history = [];
    this.dotW = 6;
    this.dotH = 6;
    this.dotColor = "green";
    this.plotLineColor = null;
    this.ship = null;
  }

  associateShip(ship) {
    this.ship = ship;
  }

  drawLayer() {
    this.fillStyle (this.dotColor);
    this.rect(this.ship.position.x-(this.dotW/2), this.ship.position.y+(this.dotH/2), this.dotW, this.dotH);
    this.strokeStyle(this.plotLineColor);
    this.line(this.ship.position.previous.x, this.ship.position.previous.y, this.ship.position.x, this.ship.position.y);
    this.fillStyle ("black");
    //this.logMoment(this.ship); think this should be done elsewhere
    this.renderHistory();

  }

  logMoment() {
      var moment = {
        position: {
          previous: this.ship.position.previous,
          x: this.ship.position.x,
          y: this.ship.position.y,
        },
        time: this.ship.time,
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

  isShipVisible() {
    var x = this.viewport.cx(this.ship.position.x);
    var y = this.viewport.cy(this.ship.position.y);
    var px = this.viewport.cx(this.ship.position.previous.x);
    var py = this.viewport.cy(this.ship.position.previous.y);
    var endPointOnscreen   = (  x >= 0 &&  x < this.viewport.width &&  y >= 0 &&  y < this.viewport.height);
    var startPointOnscreen = ( px >= 0 && px < this.viewport.width && py >= 0 && py < this.viewport.height);

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
