import CanvasLayer from './CanvasLayer.js';

class PlanetLayer extends CanvasLayer {
  constructor(viewport, planet) {
    super(viewport);
    this.planet = planet;
    this.showCrosshairs = false;
    if(this.showCrosshairs) {
      this.once = true;
      this.crosshairs = [];
      this.viewport.associatePlanetLayer(this);
    }
  }

  associatePlanet(planet) {
    this.planet = planet;
  }

  drawLayer() {
    // draw planet
    this.gradient(0,0,this.planet.height*2,0,2*Math.PI);

    this.fillStyle("green");
    this.circle(0,0,this.planet.height,0,2*Math.PI);

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
    this.fillStyle("black");

    this.fillStyle("black");
    this.rect(-40, this.planet.height + 1000, 80, 1);
    this.rect(-40, this.planet.height + 2000, 80, 1);
    this.rect(-40, this.planet.height + 3000, 80, 1);
    this.rect(-40, this.planet.height + 4000, 80, 1);

    this.rect(-8, this.planet.height +  500, 4, 1);
    this.rect(-8, this.planet.height + 1500, 4, 1);
    this.rect(-8, this.planet.height + 2500, 4, 1);
    this.rect(-8, this.planet.height + 3500, 4, 1);
    this.rect(-8, this.planet.height + 4500, 4, 1);

    this.text("1000", 50, this.planet.height + 1000 - 30);
    this.text("2000", 50, this.planet.height + 2000 - 30);
    this.text("3000", 50, this.planet.height + 3000 - 30);
    this.text("4000", 50, this.planet.height + 4000 - 30);

    if(this.showCrosshairs) {
      this.fillStyle("purple");
      let z = {
        x: -( (1/this.viewport.scale) * (this.viewport.offset.x - 500) ),
        y:  ( (1/this.viewport.scale) * (this.viewport.offset.y + 250) ),
      }
      this.rect(z.x - 400, z.y, 800, 1);
      this.rect(z.x, z.y + 400, 1, 800);
      const fillStyles = ["green", "red", "blue", "pink", "yellow"]
      if(this.once) {
        this.crosshairs.push({
          x: -(this.viewport.offset.x - 500),
          y: this.viewport.offset.y + 250
        });
        this.once = false;
      }
      let a = 0;
      for(var crosshair of this.crosshairs) {
        this.fillStyle(fillStyles[a]);
        this.rect(crosshair.x - 400, crosshair.y, 800, 1);
        this.rect(crosshair.x, crosshair.y + 400, 1, 800);
        this.text(a++, crosshair.x + 10 + (a*10), crosshair.y - 10);
      }
    }
  }
}

export default PlanetLayer;
