import Viewport from './Viewport.js';

class CanvasLayer {

  constructor (viewport) {
    this.viewport = viewport;
    //set up canvas DOM element
    this.canvasElement = this.createCanvasElement();
    //create 2d canvas context
    this.ctx = (this.canvasElement.getContext) ? this.canvasElement.getContext('2d') : null;
  }

  createCanvasElement(){
    var canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("width", this.viewport.width);
    canvasElement.setAttribute("height", this.viewport.height);
    this.viewport.container.appendChild(canvasElement);
    this.viewport.canvases.push(this);
    return canvasElement;
  }

  drawLayer() {}

  rect(x,y,w,h) {
    this.ctx.fillRect(this.viewport.cx(x), this.viewport.cy(y), this.viewport.s(w), this.viewport.s(h));
  }

  fillStyle(style) {
    this.ctx.fillStyle = style;
  }

  strokeStyle(color) {
    this.ctx.strokeStyle = color;
  }

  circle(x,y,radius,a,e) {
    this.ctx.beginPath();
    this.ctx.arc(this.viewport.cx(x),this.viewport.cy(y),this.viewport.s(radius),a,e);
    this.ctx.fill();
  }

  gradient(x,y,r,a,e) {

    // Create gradient
     var grd = this.ctx.createRadialGradient(this.viewport.cx(x), this.viewport.cy(y), this.viewport.s(0),this.viewport.cx(x), this.viewport.cy(y), this.viewport.s(r));

     // Add colors
     grd.addColorStop(0.000, 'rgba(127, 63, 0, 1.000)');
     grd.addColorStop(0.5, 'rgba(86, 255, 255, 1.000)');

     grd.addColorStop(0.51, 'rgba(250, 250, 250, 1.000)');
     grd.addColorStop(1, 'rgba(250, 250, 250, .9)');

     // Fill with gradient
     this.ctx.fillStyle = grd;
     this.ctx.fillRect(0, 0, r, r);

     // this.ctx.beginPath();
     // this.ctx.arc(this.viewport.cx(x),this.viewport.cy(y),this.viewport.s(radius),a,e);
     // this.ctx.fill();

  }

  line(xBegin,yBegin,xEnd,yEnd) {;
    this.ctx.beginPath();
    this.ctx.moveTo(this.viewport.cx(xBegin),this.viewport.cy(yBegin));
    this.ctx.lineTo(this.viewport.cx(xEnd),this.viewport.cy(yEnd));
    this.ctx.lineWidth = this.viewport.s(3);
    this.ctx.stroke();
  }

  text(text, x,y) {
    this.ctx.font = '8px sans-serif';
    this.ctx.fillText(text, this.viewport.cx(x), this.viewport.cy(y));
  }

  textFixed(text, x,y) {
    this.ctx.font = '12px sans-serif';
    this.ctx.fillText(text, x, y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
  }

};

export default CanvasLayer;
