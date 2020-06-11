import CanvasLayer from './CanvasLayer.js';

class UILayer extends CanvasLayer {
  constructor(viewport) {
    super(viewport);
    this.timewarpText = "";
  }

  init(){
    updateTimewarp(timewarp);
    ui.drawLayer();
  }

  drawLayer(){
    ui.clear();

    // timewarp indicator
    this.textFixed(this.timewarpText, viewport.width - 100, viewport.height - 10);
  }

  setTimewarpText(text) {
    this.timewarpText = text;
  }

}

export default UILayer;
