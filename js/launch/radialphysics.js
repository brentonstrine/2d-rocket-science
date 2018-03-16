var v = vector() || (function(){debugger;})();


// Ship vars
var ship = document.querySelector(".ship");
var fuel = 30;
var position = {x:0, y: 300};
var velocity = {x:0, y:0};
var thrust = {x:17.4, y:0};//x=15

// Relative Directions
var nav = {
  // planet-relative
  down: {x:null, y:null,},
  up: {x:null, y:null,},
  clockwise: {x:null, y:null,},
  anticlockwise: {x:null, y:null,},

  // ship-relative
  prograde: {x:null, y:null,},
  retrograde: {x:null, y:null,},
};

// Planet vars
var gravityVector = {x:null, y:null};
var gravityForce = -1;

// Viewport Vars
var world = document.querySelector(".world");
var worldWidth = 1000;
var worldHeight = 1000;
var dotW = 1;
var dotH = 1;
var dotColor = "green";

var count = 0;
var step = 1000;

function tick() {
  console.log(count);
  calculateVelocity();
  renderTick();
  if(++count%step<step-1){
    setTimeout(tick, 0);
  }
}

var calculateVelocity = function () {
  // no thrust if not enough fuel
  var totalThrust = thrust.x + thrust.y;
  if (fuel > totalThrust) {
    fuel = fuel - totalThrust;
  } else {
    dotColor = "gray";
    thrust = {x:0, y:0};
  }

  gravityVector = v.getGravity();

  // update velocity
  velocity.x = velocity.x + thrust.x + gravityVector.x;
  velocity.y = velocity.y + thrust.y + gravityVector.y;

  // update position
  position.x = position.x + velocity.x;
  position.y = position.y + velocity.y;

};


var calculateThrust = function () {
debugger;
  // no thrust if not enough fuel
  var totalThrust = thrust.x + thrust.y;
  if (fuel > totalThrust) {
    fuel = fuel - totalThrust;
  } else {
    dotColor = "gray";
    return {x:0, y:0};
  }

  // nav.down = v.getDown();
  // nav.up = v.getReverse(nav.down);
  // nav.clockwise = v.getStarboard(up);
  // nav.anticlockwise = v.getPort(up);


  gravityVector = v.getGravity(down);

  // update velocity
  velocity.x = velocity.x + thrust.x + gravityVector.x;
  velocity.y = velocity.y + thrust.y + gravityVector.y;

  // update position
  position.x = position.x + velocity.x;
  position.y = position.y + velocity.y;

};

var Render = function (layer) {
  //correct the x coordinates
  var cx = function cx(x){
    return x + (worldWidth/2);
  }
  // correct the y coordinates
  var cy = function cy(y){
    return ((y * -1) + (worldHeight/2));
  }

  if (layer.getContext) {
    var ctx = layer.getContext('2d');
  }
  return {
    rect: function (x,y,w,h) {
      ctx.fillRect(cx(x), cy(y), w, h);
    },
    fillStyle: function (style) {
      ctx.fillStyle = style;
    },
    circle: function (x,y,radius,a,e) {
      ctx.beginPath();
      ctx.arc(cx(x),cx(y),radius,a,e);
      ctx.fill();
    },
  };
};

var renderShip = new Render(ship);
var renderTick = function (){
  renderShip.fillStyle (dotColor);
  renderShip.rect(position.x, position.y, dotW, dotH);
};

var renderWorld = new Render(world);
var setupWorld = function() {
  world.setAttribute("width", worldWidth);
  world.setAttribute("height", worldHeight);
  ship.setAttribute("width", worldWidth);
  ship.setAttribute("height", worldHeight);


  // draw planet
  renderWorld.fillStyle("green");
  renderWorld.circle(0,0,280,0,2*Math.PI);

  // draw crosshairs
  renderWorld.fillStyle("black");
  renderWorld.rect(-20, 0, 40, 1);
  renderWorld.rect(0, 20, 1, 40);

  /* getVectorDirectionNormalized({x: 45, y: -12});

  var vector1 = {x: -314, y: 140};
  var vector2 = getPerpindicularVectorRight(vector1);
  vector2.x = vector2.x + vector1.x;
  vector2.y = vector2.y + vector1.y;

  var vector3 = getPerpindicularVectorLeft(vector1);
  vector3.x = vector3.x + vector1.x;
  vector3.y = vector3.y + vector1.y;

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(cx(vector1.x), cy(vector1.y));
  ctx.lineTo(cx(0), cy(0));
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(cx(0), cy(0),5,0,2*Math.PI);
  ctx.fill();


  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx(vector1.x), cy(vector1.y));
  ctx.lineTo(cx(vector2.x), cy(vector2.y));
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(cx(vector2.x), cy(vector2.y),5,0,2*Math.PI);
  ctx.fill();

  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(cx(vector1.x), cy(vector1.y));
  ctx.lineTo(cx(vector3.x), cy(vector3.y));
  ctx.stroke();
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(cx(vector3.x), cy(vector3.y),5,0,2*Math.PI);
  ctx.fill(); */
};
setupWorld();
tick();
world.addEventListener("click", function(){tick();});


// compare 162 to 122!
