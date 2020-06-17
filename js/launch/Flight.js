class Flight {
  constructor(ship, ui) {
    this.ship = ship;
    this.ui = ui;
    this.debugging = {timediff: new Date()};
  }

  onTheFly() {
    // set how frequently we replot and whether that's a single plot or a batch plot
    // some of this logic is very similar to UILayer::updateTimewarp(), but
    if (Math.sign(this.ui.timewarp) > 0) {
      this.ship.drawPosition();
      setTimeout(this.onTheFly.bind(this), this.ui.timewarp);// smaller values of timewarp are "faster" time because timewarp is how often the timeout repeats
    } else {
      // when timewarp is below 1 (1ms) then we start doing a batch of plots each repeat instead of only plotting a single move each repeat
      this.ship.plotBatch();
      setTimeout(this.onTheFly.bind(this), 10);
      let now = new Date();
      console.log("Batchplot!", now - this.debugging.timediff, "ms");
      this.debugging.timediff = now;
    }
  }
}

export default Flight;
