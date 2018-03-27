(function (global) {
var RocketScience = global.RocketScience = global.RocketScience || {};
var render = RocketScience.render;

var parts = [];

var buildPart = function(part){
  var partId = parts.length;
  part.id = partId;
  parts.push(part);
  render.part(part);
  return partId;
};

var getCleanId = function (domId) {
  if(typeof domId === "string" && domId.match("part")){
    return domId.substring(4);
  }
  return domId;
};

var getPart = function(partId){
  return parts[getCleanId(partId)];
};

var getPartZone = function (part, edge) {
  var buffer = 10;
  var x = getXSpan(part, edge);
  var y = getYSpan(part, edge, buffer);
  var mid = [getXPoint(part, edge), getYPoint(part,edge)];

// debugging
//   var partElement = document.createElement("div");
//   document.querySelector(".parts").appendChild(partElement);
//   partElement.setAttribute("class", "zone");
//   partElement.style.left = x[0] + "px";
//   partElement.style.width = x[1] - x[0] + "px";
//   partElement.style.top = y[0] + "px";
//   partElement.style.height = y[1] - y[0] + "px";
//
// console.log (x, y, mid)
//     var partElement2 = document.createElement("div");
//     document.querySelector(".parts").appendChild(partElement2);
//     partElement2.setAttribute("class", "zoneMid");
//     partElement2.style.left = mid[0] + "px";
//     partElement2.style.top = mid[1] + "px";

  return x.concat(y).concat(mid);
};

var getYSpan = function (part, edge, buffer) {
  y = getYPoint(part, edge)
  yStart = y - buffer;
  yEnd = y + buffer;
  return [yStart, yEnd];
};

var getXSpan = function (part, edge) {
  var buffer = part.width * 0.3;
  var xStart = part.position.x + buffer;
  var xEnd = part.position.x + part.width - buffer;
  return [xStart, xEnd];
};

var getYPoint = function (part, edge) {
  if(edge === "top") {
    var y = part.position.y;
  } else if (edge === "bottom") {
    var y = part.position.y + part.height;
  }
  return y;
};

var getXPoint = function (part) {
  return part.position.x + (part.width / 2);
};

var getSnapZones = function(heldPartId){
  heldPartId = getCleanId(heldPartId);
  var heldPart = parts[heldPartId];
  var snapLocation;
  var partEdges = [];
  var compatibleParts = {};

  if (heldPart.type === "tank") {
    compatibleParts.engine = "top";
  } else if (heldPart.type === "engine") {
    compatibleParts.tank = "bottom";
  }

  parts.forEach(function(part){
    if(part.id !== heldPartId && compatibleParts[part.type]){
      partEdges[heldPartId] = getPartZone(part, compatibleParts[part.type]);
    }
  });

  return partEdges;
};


var getSnapLocation = function(partId){
  partId = getCleanId(partId);
  var part = parts[partId];
  if (part.type === "tank") {
    var edge = "bottom";
  } else if (part.type === "engine") {
    var edge = "top";
  }
  var snapLocation = {
    x: getXPoint(part, edge),
    y: getYPoint(part, edge),
  };
  return snapLocation;
};

var updatePart = function(partId, newProps){
  var part = parts[getCleanId(partId)];

  for(prop in newProps) {
    if(newProps.hasOwnProperty(prop)){
      //console.log(prop, newProps[prop]);
      part[prop] = newProps[prop];
    }
  }

  render.part(part);
};

var join = function(part1Id, part2Id) {

};
var join = function(part1Id, part2Id) {

};

RocketScience.part = {
  inventory: parts,
  build: buildPart,
  update: updatePart,
  getSnapZones: getSnapZones,
  getSnapLocation: getSnapLocation,
  get: getPart,
  join: join,
}
}(window));