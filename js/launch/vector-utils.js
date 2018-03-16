var vector = function () {
  return {
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
        vector.x = (total.x) ? total.x - vector.x : vector.x;
        vector.y = (total.y) ? total.y - vector.y : vector.y
        total = {x:vector.x, y:vector.y};
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
    // setMagnitudeOLD: function (v, m) {// Change a vector's values from a percent to a particular magnitude
    //   // get the ratio of x/y (abs x+y always == 1)
    //   if(v.x === 0) { v.x = 0.000000000000000001; }
    //   if(v.y === 0) { v.y = 0.000000000000000001; }
    //   var r = v.x / v.y;
    //   var xm = (m * r) / (Math.sqrt(r**2 + 1));
    //   var ym = xm / r; // also could have used ym = (Math.pow(m, 1/4) * r) / Math.sqrt((r**2)+1);
    //
    //   if(Math.abs(xm) < 0.000000000000000001) { xm = 0; }
    //   if(Math.abs(ym) < 0.000000000000000001) { ym = 0; }
    // 	if(v.x>0 && xm>0){xm *= -1;}
    // 	if(v.x<0 && xm<0){xm *= -1;}
    // 	if(v.y>0 && ym>0){ym *= -1;}
    // 	if(v.y<0 && ym<0){ym *= -1;}
    // 	var completeVector = {x:xm, y:ym};
    //
    // 	return completeVector;
    // },

    // getDirectionNormalized: function(v) {// This normalizes a vector direction so that the magnitude is a constant 100.
    // 		var direction = this.getDirection(v);
    //     var magnitude = this.getMagnitude(v);
    //     this.setMa%gnitude(direction, magnitude);
    // },
    getOpposite: function (vector){
    	return v.multiply(vector, -1);
    },
    getPerpindicularRight: function (vector) {
    	return {
      	x: vector.y,
        y: vector.x * -1,
      };
    },
    getPerpindicularLeft: function (vector) {
    	return {
      	x: vector.y * -1,
        y: vector.x,
      };
    },
    getGravity: function (){
      return v.multiply(v.normalize(position),gravityForce);
    },
  };
};