window.RocketScience = window.RocketScience || {};
(function (ui) {

  var context = RocketScience.render(ui.layer);
  var viewport = RocketScience.renderTools.getViewportData();
  var timewarpText = "";


  ui.init = function (){
    updateTimewarp(timewarp);
    ui.drawLayer();
  };

  ui.drawLayer = function (){
    ui.clear();

    // timewarp indicator
    context.textFixed(timewarpText, viewport.width - 100, viewport.height - 10);
  };

  ui.setTimewarpText = function(text) {
    timewarpText = text;
  };


  RocketScience.ui = ui;
})(RocketScience.layer(document.querySelector(".ui")));