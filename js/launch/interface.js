window.RocketScience = window.RocketScience || {};

(function interface () {
  var renderTools = RocketScience.renderTools;

  RocketScience.Interface = function () {
    var controls = document.querySelector(".viewport-controls ")
    var zoomInBtn = controls.querySelector(".zoom-in");
    var zoomOutBtn = controls.querySelector(".zoom-out");
    var leftBtn = controls.querySelector(".left");
    var rightBtn = controls.querySelector(".right");
    var upBtn = controls.querySelector(".up");
    var downBtn = controls.querySelector(".down");

    zoomInBtn.addEventListener("click", renderTools.zoomIn);
    zoomOutBtn.addEventListener("click", renderTools.zoomOut);
    leftBtn.addEventListener("click", renderTools.panLeft);
    rightBtn.addEventListener("click", renderTools.panRight);
    upBtn.addEventListener("click", renderTools.panUp);
    downBtn.addEventListener("click", renderTools.panDown);

    document.addEventListener("keydown", function(e){
      if(e.shiftKey){
        if (e.keyCode == 187) { // plus
          return renderTools.zoomIn();
        } else if (e.keyCode == 189) { // minus
          return renderTools.zoomOut();
        }
      }

      if(e.keyCode == 37) { // left
        return renderTools.panLeft();
      } else if (e.keyCode == 38) { // up
        return renderTools.panUp();
      } else if (e.keyCode == 39) { // right
        return renderTools.panRight();
      } else if (e.keyCode == 40) { // down
        return renderTools.panDown();
      } else if (e.keyCode == 65) { // a (port)
        gimbalOrder = "port";
      } else if (e.keyCode == 68) { // d (starboard)
        gimbalOrder = "starboard";
      } else if (e.keyCode == 190) { // > (speed up time)
        var warp = timewarp - 1;
        warp *= 0.8;
        updateTimewarp(warp);
      } else if (e.keyCode == 188) { // < (slow time)
        var warp = timewarp + 1;
        warp *= 1.2;
        updateTimewarp(warp);
      }
    });

    document.querySelector(".ui").addEventListener("wheel", function(e){
      if (e.shiftKey) {
        if (Math.sign(e.deltaY) === 1) {
          return renderTools.zoomOut();
        } else if (Math.sign(e.deltaY) === -1) {
          return renderTools.zoomIn();
        }
      } else {
        if (Math.sign(e.deltaY) === 1) {
          return renderTools.panDown(e.deltaY/2);
        } else if (Math.sign(e.deltaY) === -1) {
          return renderTools.panUp(Math.abs(e.deltaY/2));
        }
        if (Math.sign(e.deltaX) === 1) {
          return renderTools.panRight(e.deltaX/2);
        } else if (Math.sign(e.deltaX) === -1) {
          return renderTools.panLeft(Math.abs(e.deltaX/2));
        }
      }
    });
  };
}());