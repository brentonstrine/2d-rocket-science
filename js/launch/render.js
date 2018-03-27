window.RocketScience = window.RocketScience || {};

(function render () {

  // Viewport Vars
  var viewportWidth = 1000; // is not scaled
  var viewportHeight = 500; // is not scaled
  var viewportOffset = {};
  var scale = .1;
  var adjustedOffset = {x:0, y:0};
  var adjustedScale = scale;

  var dotColor = "green";

  RocketScience.renderTools = {
    //correct the x coordinates
    cx: function cx(x){
      return Math.round((x * scale) + viewportOffset.x);
    },
    // correct the y coordinates
    cy: function cy(y){
      return Math.round((y * -1 * scale) + viewportOffset.y + viewportHeight);
    },
    s: function s(d) {
      return Math.ceil(d * scale);
    },
    viewport: function (viewCenter) {
      viewCenter = viewCenter || "surface";
      window.scale = adjustedScale;
      if (viewCenter === "planet") {
        // Planet center is centered
        viewportOffset.x = viewportWidth/2;
        viewportOffset.y = viewportHeight/-2;
      } else if (viewCenter === "surface") {
        // 50 pixels below the surface
        viewportOffset.x = viewportWidth/2;
        viewportOffset.y = renderTools.s(planet.height) - 50;
      } else if (viewCenter === "launchpad") {
         // Launch point is centered
         viewportOffset.x = viewportWidth/2;
         viewportOffset.y = renderTools.s(planet.height) - viewportHeight/2;
      }
      viewportOffset.x -= adjustedOffset.x;
      viewportOffset.y -= adjustedOffset.y;
    },
    panLeft: function() {
      adjustedOffset.x = adjustedOffset.x - (50);
      renderTools.rerenderViewport();
    },
    panRight: function() {
      adjustedOffset.x = adjustedOffset.x + (50);
      renderTools.rerenderViewport();
    },
    panUp: function() {
      adjustedOffset.y = adjustedOffset.y - (50);
      renderTools.rerenderViewport();
    },
    panDown: function() {
      adjustedOffset.y = adjustedOffset.y + (50);
      renderTools.rerenderViewport();
    },
    zoomIn: function() {
      scale *= 1.1;
      renderTools.rerenderViewport();
    },
    zoomOut: function() {
      scale *= 0.9;
      renderTools.rerenderViewport();
    },
    rerenderViewport: function(){
      world.clear();
      renderTools.viewport();
      world.render();
    },
    getViewportData: function(){
      return {
        width: viewportWidth,
        height: viewportHeight,
      }
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
        //ctx.font = '8px sans-serif';
        //ctx.fillText(text, cx(x), cy(y));
      },
      clear: function() {
        ctx.clearRect(0, 0, viewportWidth, viewportHeight);
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