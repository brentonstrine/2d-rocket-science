window.RocketScience = window.RocketScience || {};
(function (ship) {
  var context = RocketScience.render(ship.layer);
  var history = [];
  var dotW = 4;
  var dotH = 4;
  var dotColor = "green";

  ship.render = function (){
    context.fillStyle (dotColor);
    context.rect(position.x-(dotW/2), position.y+(dotH/2), dotW, dotH);
    context.line(position.previous.x, position.previous.y, position.x, position.y);

    context.fillStyle ("black");
    context.text("T+"+time, position.x+3, position.y-3);
    ship.logMoment();
  };
  ship.logMoment = function(){
      var moment = {
        position: {
          previous: position.previous,
          x: position.x,
          y: position.y,
        },
        time: time,
      };
      history.push(moment);
  };

  ship.renderHistory = function (){
    history.forEach(function(moment){
      context.fillStyle (dotColor);
      context.rect(moment.position.x-(dotW/2), moment.position.y+(dotH/2), dotW, dotH);
      context.line(moment.position.previous.x, moment.position.previous.y, moment.position.x, moment.position.y);

      context.fillStyle ("black");
      context.text("T+"+moment.time, moment.position.x+3, moment.position.y-3);
    });
  };

  ship.isVisible = function(){
    var viewport = renderTools.getViewportData();
    var x = context.cx(position.x);
    var y = context.cy(position.y);
    var px = context.cx(position.previous.x);
    var py = context.cy(position.previous.y);
    var endPointOnscreen   = (  x >= 0 &&  x < viewport.width &&  y >= 0 &&  y < viewport.height);
    var startPointOnscreen = ( px >= 0 && px < viewport.width && py >= 0 && py < viewport.height);

    if (startPointOnscreen || endPointOnscreen) {
      return true;
    } else {
      return false;
    }
  };

  ship.setDotColor = function (color){
    dotColor = color;
  };

  RocketScience.ship = ship;
})(RocketScience.layer(document.querySelector(".ship")));