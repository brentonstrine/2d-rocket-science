window.RocketScience = window.RocketScience || {};

(function PerformanceTracking () {
  var lastType = "onscreen";
  RocketScience.PerformanceTracking = function (type) {
  //var AvgType = function(type){
  this.count = 0;
  this.lastTime;
  this.average = 0;
  this.avg = function(){
    var now = new Date();
    if(this.lastType===type && typeof this.lastTime === "object"){
      this.count++;
      this.average = (this.average + (now - this.lastTime)) / this.count;
      console.log(type, this.average);
    } else {
      this.lastType = type;
    }
    this.lastTime = now;
  };
};
}());
