window.RocketScience = window.RocketScience || {};
(function (ship) {
  var context = RocketScience.render(ship.layer);

  ship.render = function (){
    context.fillStyle (dotColor);
    context.rect(position.x-(dotW/2), position.y+(dotH/2), dotW, dotH);
    context.line(position.previous.x, position.previous.y, position.x, position.y);
  };

  ship.layer.addEventListener("click", function(){
    tick();
  });

  ship.isVisible = function(){
    var x = context.cx(position.x);
    var y = context.cy(position.y);
    var px = context.cx(position.previous.x);
    var py = context.cy(position.previous.y);

    if (x > 0 && x < viewportWidth && y > 0 && y < viewportHeight && px > 0 && px < viewportWidth && py > 0 && py < viewportHeight) {
      return true;
    } else {
      return false;
    }

    debugger;
  };

  RocketScience.ship = ship;
})(RocketScience.layer(document.querySelector(".ship")));