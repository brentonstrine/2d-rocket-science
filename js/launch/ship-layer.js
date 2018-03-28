window.RocketScience = window.RocketScience || {};
(function (shipLayer) {
  var context = RocketScience.render(shipLayer.layer);
  var history = [];
  var dotW = 4;
  var dotH = 4;
  var dotColor = "green";

  shipLayer.render = function (){
    context.fillStyle (dotColor);
    context.rect(ship.position.x-(dotW/2), ship.position.y+(dotH/2), dotW, dotH);
    context.line(ship.position.previous.x, ship.position.previous.y, ship.position.x, ship.position.y);

    context.fillStyle ("black");
    //context.text("T+"+time, position.x+3, position.y-3);
    shipLayer.logMoment();
  };
  shipLayer.logMoment = function(){
      var moment = {
        position: {
          previous: ship.position.previous,
          x: ship.position.x,
          y: ship.position.y,
        },
        time: time,
      };
      history.push(moment);
  };

  shipLayer.renderHistory = function (){
    history.forEach(function(moment){
      context.fillStyle (dotColor);
      context.rect(moment.position.x-(dotW/2), moment.position.y+(dotH/2), dotW, dotH);
      context.line(moment.position.previous.x, moment.position.previous.y, moment.position.x, moment.position.y);

      context.fillStyle ("black");
      //context.text("T+"+moment.time, moment.position.x+3, moment.position.y-3);
    });
  };

  shipLayer.isVisible = function(){
    var viewport = renderTools.getViewportData();
    var x = context.cx(ship.position.x);
    var y = context.cy(ship.position.y);
    var px = context.cx(ship.position.previous.x);
    var py = context.cy(ship.position.previous.y);
    var endPointOnscreen   = (  x >= 0 &&  x < viewport.width &&  y >= 0 &&  y < viewport.height);
    var startPointOnscreen = ( px >= 0 && px < viewport.width && py >= 0 && py < viewport.height);

    if (startPointOnscreen || endPointOnscreen) {
      return true;
    } else {
      return false;
    }
  };

  shipLayer.setDotColor = function (color){
    dotColor = color;
  };

  RocketScience.shipLayer = shipLayer;
})(RocketScience.layer(document.querySelector(".ship")));