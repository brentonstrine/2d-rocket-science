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
      }
    });
  };
}());