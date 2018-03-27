window.RocketScience = window.RocketScience || {};
(function (world) {
  world.render = function (){
    context = RocketScience.render(world.layer);
    // draw planet
    context.fillStyle("green");
    context.circle(0,0,planet.height,0,2*Math.PI);

    // draw crosshairs
    context.fillStyle("black");
    context.rect(-20, 0, 40, 1);
    context.rect(0, 20, 1, 40);

    // draw crosshairs
    context.fillStyle("black");
    context.rect(-40, planet.height + 45, 80, 1);
    context.rect(-40, planet.height + 105, 80, 1);
  };

  RocketScience.world = world;
})(RocketScience.layer(document.querySelector(".world")));