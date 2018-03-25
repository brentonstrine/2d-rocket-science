window.RocketScience = window.RocketScience || {};

(function render () {

  RocketScience.renderTools = {
    //correct the x coordinates
    cx: function cx(x){
      return Math.round((x * viewportScale) + viewportOffset.x);
    },
    // correct the y coordinates
    cy: function cy(y){
      return Math.round((y * -1 * viewportScale) + viewportOffset.y + viewportHeight);

//(0*-1) + -250 + 500 * scale = 250
    },
    s: function s(d) {
      return Math.ceil(d * viewportScale);
    },
  };

  RocketScience.render = function (layer) {
    var cx = this.renderTools.cx;
    var cy = this.renderTools.cy;
    var s = this.renderTools.s;
    if (layer.getContext) {
      var ctx = layer.getContext('2d');
    }
    return {
      rect: function (x,y,w,h) {
        ctx.fillRect(cx(x), cy(y), s(w), s(h));
      },
      fillStyle: function (style) {
        ctx.fillStyle = style;
      },
      circle: function (x,y,radius,a,e) {
        ctx.beginPath();
        ctx.arc(cx(x),cy(y),s(radius),a,e);
        ctx.fill();
      },
      line: function (xBegin,yBegin,xEnd,yEnd) {
        ctx.strokeStyle = "#eeeeee";
        ctx.beginPath();
        ctx.moveTo(cx(xBegin),cy(yBegin));
        ctx.lineTo(cx(xEnd),cy(yEnd));
        ctx.lineWidth = s(1);
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