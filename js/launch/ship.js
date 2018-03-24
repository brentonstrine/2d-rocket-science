window.RocketScience = window.RocketScience || {};
(function (ship) {
  var context = RocketScience.render(ship.layer);

  ship.render = function (){
    context.fillStyle (dotColor);
    context.rect(position.x-(dotW/2), position.y+(dotH/2), dotW, dotH);
    context.line(position.previous.x, position.previous.y, position.x, position.y);

    context.fillStyle ("black");
    //var text = `x: ${context.cx(position.x)}, y: ${context.cx(position.y)}`;
    context.text("T+"+time, position.x+3, position.y-3);

    // var text = `t+${thrust.x}, ${thrust.y}`;
    // context.text(text, position.x+10, position.y-10);
  };

  ship.layer.addEventListener("click", function(){
    console.log("ManualClick!");
    plotBatch();
  });

  ship.isVisible = function(){
    var x = context.cx(position.x);
    var y = context.cy(position.y);
    var px = context.cx(position.previous.x);
    var py = context.cy(position.previous.y);
    var endPointOnscreen   = (  x >= 0 &&  x < viewportWidth &&  y >= 0 &&  y < viewportHeight);
    var startPointOnscreen = ( px >= 0 && px < viewportWidth && py >= 0 && py < viewportHeight);

    if (startPointOnscreen || endPointOnscreen) {
      return true;
    } else {
      return false;
    }
  };

  RocketScience.ship = ship;
})(RocketScience.layer(document.querySelector(".ship")));