(function (global) {
var RocketScience = global.RocketScience = global.RocketScience || {};

var part = function(part){
  var engine = function(){
    //get width of engine for this height.
    var enginewidth = part.height * .908695;

    //figure out what the remainder is for leftover engines at this width
    var excess = 0;

    if(part.width>enginewidth){
        excess = part.width % enginewidth;
    }
    var rockets = (part.width / enginewidth);
    var excessC = part.width - (rockets*enginewidth);


    // console.log("\r\nrockets: " + Math.floor(rockets) +"/"+ rockets);
    // console.log("excess: " + excess +" / "+ excessC);
    // console.log("width/Rwidth: " + part.width +" / "+ enginewidth);

    //var actualrockets = part.width*Math.floor(rockets);
    var notrockets = 0;
    if(excess>0){
        notrockets = part.width - excess;
        //console.log("excess:" + excess + " w-e: " + notrockets);
    }

    //subtract remainder from actual width (add to padding and remove from width)
    partElement.style.width = part.height - excess;
    partElement.style.paddingLeft = excess/2;
    partElement.style.paddingRight = excess/2;
  };

  var tank = function(){
    var maxfont = 18;
    if (part.height<=250){ maxfont = part.height/5; }
    if(part.width<=60 && 60<=maxfont){ maxfont = part.width; }
    partElement.style.fontSize = maxfont + "px";
  };

  var partElement = document.querySelector("#part" + part.id);

  if(!partElement) {
    if(!part.appendTo) {
      throw "Missing `appendTo` property.";
    }
    partElement = document.createElement("div");
    part.appendTo.appendChild(partElement);
    partElement.setAttribute("id", "part" + part.id);
  }

  if(part.position){

    partElement.style.left = part.position.x + "px";
    partElement.style.top = part.position.y + "px";
    partElement.style.width = part.width + "px";
    partElement.style.height = part.height + "px";
    partElement.setAttribute("class", part.classes);

    // update part stats
    //document.querySelector("#wid").html(part.partWidth);
    //document.querySelector("#hei").html(part.partHeight);
    document.querySelector("#dry").textContent = part.dryWeight + " kg";
    document.querySelector("#fuel").textContent = part.fuelWeight + " kg";
    document.querySelector("#wet").textContent = part.wetWeight + " kg";

    if(part.type === "tank"){
      tank();
    } else if (part.type === "engine") {
      engine();
    }

    if(part.html){
      partElement.innerHTML = part.html;
    }
  }

};




RocketScience.render = {
  part: part,

}
}(window));