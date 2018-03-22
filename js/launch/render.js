window.RocketScience = window.RocketScience || {};

(function render () {
  RocketScience.render = function (layer) {
    //correct the x coordinates
    var cx = function cx(x){
      return x + 50;
    }
    // correct the y coordinates
    var cy = function cy(y){
      return ((y * -1) + viewportHeight + planetHeight - 1000);
    }

    if (layer.getContext) {
      var ctx = layer.getContext('2d');
    }
    return {
      rect: function (x,y,w,h) {
        ctx.fillRect(cx(x), cy(y), w, h);
      },
      fillStyle: function (style) {
        ctx.fillStyle = style;
      },
      circle: function (x,y,radius,a,e) {
        ctx.beginPath();
        ctx.arc(cx(x),cy(y),radius,a,e);
        ctx.fill();
      },
      line: function (xBegin,yBegin,xEnd,yEnd) {
        ctx.beginPath();
        ctx.moveTo(cx(xBegin),cy(yBegin));
        ctx.lineTo(cx(xEnd),cy(yEnd));
        ctx.lineWidth = 1;
        ctx.stroke();
      },
      cx: cx,
      cy: cy,
    };
  };

  RocketScience.layer = function (layer) {

    var setup = function () {
      layer.setAttribute("width", viewportWidth);
      layer.setAttribute("height", viewportHeight);
    };

    var render = function (){};

    return {
      setup: setup,
      render: render,
      layer: layer,
    };
  };

}());