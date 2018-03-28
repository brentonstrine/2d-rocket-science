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
      console.log(e.keyCode);
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
        timewarp *= 1.1;
        console.log(timewarp)
      } else if (e.keyCode == 188) { // < (slow time)
        timewarp *= 0.9;
        console.log(timewarp)
      }
    });
  };
}());