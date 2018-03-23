window.RocketScience = window.RocketScience || {};

(function render () {
  RocketScience.render = function (layer) {
    //correct the x coordinates
    var cx = function cx(x){
      return (Math.round(x + 50));
    }
    // correct the y coordinates
    var cy = function cy(y){
      return Math.round(((y * -1) + viewportHeight + planetHeight - 2000));
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
        ctx.strokeStyle = "#eeeeee";
        ctx.beginPath();
        ctx.moveTo(cx(xBegin),cy(yBegin));
        ctx.lineTo(cx(xEnd),cy(yEnd));
        ctx.lineWidth = 1;
        ctx.stroke();
      },
      text: function (text, x,y) {
        ctx.font = '8px sans-serif';
        ctx.fillText(text, cx(x), cy(y));
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