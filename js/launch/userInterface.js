window.RocketScience = window.RocketScience || {};
import RenderingTools from './RenderingTools.js';


function userInterface () {
  var RenderingTools = RocketScience.RenderingTools;

  RocketScience.Interface = function () {
    var controls = document.querySelector(".viewport-controls ")
    var zoomInBtn = controls.querySelector(".zoom-in");
    var zoomOutBtn = controls.querySelector(".zoom-out");
    var leftBtn = controls.querySelector(".left");
    var rightBtn = controls.querySelector(".right");
    var upBtn = controls.querySelector(".up");
    var downBtn = controls.querySelector(".down");

    zoomInBtn.addEventListener("click", RenderingTools.zoomIn);
    zoomOutBtn.addEventListener("click", RenderingTools.zoomOut);
    leftBtn.addEventListener("click", RenderingTools.panLeft);
    rightBtn.addEventListener("click", RenderingTools.panRight);
    upBtn.addEventListener("click", RenderingTools.panUp);
    downBtn.addEventListener("click", RenderingTools.panDown);

    document.addEventListener("keydown", function(e){
      //log(e.keyCode);
      if(e.shiftKey){
        if (e.keyCode == 187) { // plus
          return RenderingTools.zoomIn();
        } else if (e.keyCode == 189) { // minus
          return RenderingTools.zoomOut();
        }
      }

      if(e.keyCode == 37) { // left
        return RenderingTools.panLeft();
      } else if (e.keyCode == 38) { // up
        return RenderingTools.panUp();
      } else if (e.keyCode == 39) { // right
        return RenderingTools.panRight();
      } else if (e.keyCode == 40) { // down
        return RenderingTools.panDown();
      } else if (e.keyCode == 65) { // a (port)
        ship.gimbal("port");
      } else if (e.keyCode == 68) { // d (starboard)
        ship.gimbal("starboard");
      } else if (e.keyCode == 87) { // w (throttle up)
        ship.throttle = 1;
      } else if (e.keyCode == 83) { // s (throttle down)
        ship.throttle = 0;
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
          return RenderingTools.zoomOut();
        } else if (Math.sign(e.deltaY) === -1) {
          return RenderingTools.zoomIn();
        }
      } else {
        if (Math.sign(e.deltaY) === 1) {
          return RenderingTools.panDown(e.deltaY/2);
        } else if (Math.sign(e.deltaY) === -1) {
          return RenderingTools.panUp(Math.abs(e.deltaY/2));
        }
        if (Math.sign(e.deltaX) === 1) {
          return RenderingTools.panRight(e.deltaX/2);
        } else if (Math.sign(e.deltaX) === -1) {
          return RenderingTools.panLeft(Math.abs(e.deltaX/2));
        }
      }
    });
  };
};

export default userInterface;
