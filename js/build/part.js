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

var updatePart = function(partId, newProps){
  var part = parts[partId];

  for(prop in newProps) {
    if(newProps.hasOwnProperty(prop)){
      //console.log(prop, newProps[prop]);
      part[prop] = newProps[prop];
    }
  }

  render.part(part);
};

RocketScience.part = {
  inventory: parts,
  build: buildPart,
  update: updatePart,

}
}(window));