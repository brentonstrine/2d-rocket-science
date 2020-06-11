import CanvasLayer from './CanvasLayer.js';

class PlanetLayer extends CanvasLayer {
  drawLayer() {
    this.ctx;
debugger;
    // draw planet
    this.context.gradient(0,0,planet.height*2,0,2*Math.PI);

    this.context.fillStyle("green");
    this.context.circle(0,0,planet.height,0,2*Math.PI);

    // // Create gradient
    //  var grd = context.createRadialGradient(150.000, 150.000, 0.000, 150.000, 150.000, 150.000);
    //
    //  // Add colors
    //  grd.addColorStop(0.000, 'rgba(127, 63, 0, 1.000)');
    //  grd.addColorStop(0.500, 'rgba(63, 127, 0, 1.000)');
    //  grd.addColorStop(0.501, 'rgba(95, 191, 0, 1.000)');
    //  grd.addColorStop(0.502, 'rgba(86, 255, 255, 1.000)');
    //  grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
    //
    //  // Fill with gradient
    //  context.fillStyle = grd;
    //  context.fillRect(0, 0, 300.000, 300.000);

    // draw altitude ticks
    this.context.fillStyle("black");

    this.context.fillStyle("black");
    this.context.rect(-40, planet.height + 1000, 80, 1);
    this.context.rect(-40, planet.height + 2000, 80, 1);
    this.context.rect(-40, planet.height + 3000, 80, 1);
    this.context.rect(-40, planet.height + 4000, 80, 1);


    this.context.rect(-8, planet.height +  500, 4, 1);
    this.context.rect(-8, planet.height + 1500, 4, 1);
    this.context.rect(-8, planet.height + 2500, 4, 1);
    this.context.rect(-8, planet.height + 3500, 4, 1);
    this.context.rect(-8, planet.height + 4500, 4, 1);


    this.context.text("1000", 50, planet.height + 1000 - 30);
    this.context.text("2000", 50, planet.height + 2000 - 30);
    this.context.text("3000", 50, planet.height + 3000 - 30);
    this.context.text("4000", 50, planet.height + 4000 - 30);
  }
}

export default PlanetLayer;
