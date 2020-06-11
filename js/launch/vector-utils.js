var VectorUtils = {
  add: function () {
    var total = {x:0,y:0};
    Array.from(arguments).forEach(function(vector) {
      total = {x:total.x + vector.x, y:total.y + vector.y};
    });
    return total;
  },
  subtract: function () {
    var total = {};
    Array.from(arguments).forEach(function(vector) {
      total.x = (total.x) ? total.x - vector.x : vector.x;
      total.y = (total.y) ? total.y - vector.y : vector.y;
    });
    return total;
  },
  divide: function() {
    var total = {};
    var vectorize = this.vectorize;
    Array.from(arguments).forEach(function(vector, i) {
      if (i===0) {
        total = {x:vector.x, y:vector.y};
      } else {
        if(vector.x === 0 || vector.y === 0) {
          throw "Error, can't divide by zero.";
        }
        vector = vectorize(vector);
        vector.x = total.x / vector.x;
        vector.y = total.y / vector.y;
        total = {x:vector.x, y:vector.y};
      }
    });
    return total;
  },
  multiply: function (a, b) {
    var total = {x:1, y:1};
    var vectorize = this.vectorize;
    Array.from(arguments).forEach(function(vector, i) {
      if (i>0) {
        vector = vectorize(vector);
      }
      vector.x = total.x * vector.x;
      vector.y = total.y * vector.y;
      total = {x:vector.x, y:vector.y};
    });
    return total;
  },
  vectorize: function (v) {
    if (typeof v === "number") {
      v = {x:v, y:v};
    } else if (v.hasOwnProperty("length")) { // array
      v = {x:v[0], y:v[1]};
    } else if (v.x === "undefined" || v.y === "undefined") {
      throw "Error, not a valid vector operand.";
    }
    return v;
  },
  getMagnitude: function (a) {
    return Math.sqrt(a.x**2 + a.y**2);
  },
  normalize: function (v) {
    var m = this.getMagnitude(v);
    return this.divide(v,m);
  },
  setMagnitude: function (v, m) {// Change a vector's values from a percent to a particular magnitude
    v = this.normalize(v);
    v = this.multiply(v, m);
    return v;
  },
  getReverse: function (vector){
    return v.multiply(vector, -1);
  },
  getStarboard: function (vector) {
    return {
      x: vector.y,
      y: vector.x * -1,
    };
  },
  getPort: function (vector) {
    return {
      x: vector.y * -1,
      y: vector.x,
    };
  },
  getGravity: function (position, planet){
    return this.multiply(this.normalize(position),planet.gravity);
  },
  hasMagnitude: function (v){
    if(v.x > 0 && v.y > 0) {
      return true;
    } else {
      return false;
    }
  },
};

export default VectorUtils;
