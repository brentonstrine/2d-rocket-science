window.RocketScience = window.RocketScience || {};
(function (projectionLayer) {
  var context = RocketScience.render(projectionLayer.layer);
  var history = [];
  var dotW = 4;
  var dotH = 4;
  var dotColor = "green";

  projectionLayer.drawLayer = function (ship){
    context.fillStyle (dotColor);
    context.rect(ship.position.x-(dotW/2), ship.position.y+(dotH/2), dotW, dotH);
    context.strokeStyle(ship.plotLineColor);
    context.line(ship.position.previous.x, ship.position.previous.y, ship.position.x, ship.position.y);
    context.fillStyle ("black");
    projectionLayer.logMoment(ship);
  };
  projectionLayer.logMoment = function(ship){
      var moment = {
        position: {
          previous: ship.position.previous,
          x: ship.position.x,
          y: ship.position.y,
        },
        time: ship.time,
      };
      history.push(moment);
  };

  projectionLayer.renderHistory = function (){
    history.forEach(function(moment){
      context.fillStyle (dotColor);
      context.rect(moment.position.x-(dotW/2), moment.position.y+(dotH/2), dotW, dotH);
      context.strokeStyle(ship.plotLineColor);
      context.line(moment.position.previous.x, moment.position.previous.y, moment.position.x, moment.position.y);
      context.fillStyle ("black");
    });
  };

  projectionLayer.isVisible = function(ship){
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

  projectionLayer.clearHistory = function (){
    history = [];
  };

  projectionLayer.setDotColor = function (color){
    dotColor = color;
  };

  RocketScience.projectionLayer = projectionLayer;
})(RocketScience.layer(document.querySelector(".projections")));