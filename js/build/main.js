$("document").ready(function(){
  var currentMousePos = { x: -1, y: -1 };
  $(document).mousemove(function(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
      $("#mousex").html(currentMousePos.x);
      $("#mousey").html(currentMousePos.y);

  });
  var buildtype = "tank";

  $(".controls").on("click mousedown touchstart", function(e){
      e.stopPropagation();
  });
  $("#tank").on("click", function(e){
      buildtype = "tank";
      $("#nextpart").html(buildtype);
  });
  $("#engine").on("click", function(){
      buildtype = "engine";
      $("#nextpart").html(buildtype);
  });


  $(".parts").on("mousedown touchstart", ".part", function(pos){
      console.log("parts.on.mousemove.touchstart");

      pos.preventDefault();
      pos.stopPropagation();

      var cursorX = pos.clientX || event.pageX || event.touches[0].pageX;
      var cursorY = pos.clientY || event.pageY || event.touches[0].pageY;
      var $this = $(this);
      var heldPartId = $this.attr("id");
      var partPosition = $this.css(["top", "left"]);

      offsetY = cursorY - partPosition["top"].replace(/[^-\d\.]/g, '');
      offsetX = cursorX - partPosition["left"].replace(/[^-\d\.]/g, '');
      console.log(offsetX, offsetY);

      var width = RocketScience.part.get(heldPartId).width;
      var snapZones = RocketScience.part.getSnapZones(heldPartId);

      $("body").on("mousemove.partmove touchmove", function(e){
          console.log("body.on.mousemove.partmove");
          e.preventDefault();
          var newPartX = e.clientX || event.pageX || event.touches[0].pageX;
          var newPartY = e.clientY || event.pageY || event.touches[0].pageY;

          newPartX -= offsetX;
          newPartY -= offsetY;

          // update part
          RocketScience.part.update(heldPartId, {position: {x: newPartX, y: newPartY}});

          snapLocation = RocketScience.part.getSnapLocation(heldPartId);

          snapZones.forEach(function(zone, i){
            var inXRange = (snapLocation.x > zone[0] && snapLocation.x < zone[1]);
            var inYRange = (snapLocation.y > zone[2] && snapLocation.y < zone[3]);
            if (inXRange && inYRange) {
              //RocketScience.part.join(i, heldPartId);
              var snappedPart = RocketScience.part.get(i);
              newPartX = zone[4] - (width/2) ;// - offsetX;
              newPartY = zone[5];// - offsetY;
              RocketScience.part.update(heldPartId, {position: {x: newPartX, y: newPartY}});
            }
          });
      });


      $this.one("mouseup touchcancel", function(){
          console.log("parts.one.mouseup.touchcancel");
          $("body").off(".partmove");
      });
  });


  // $(".parts").on("mouseenter", ".part", function(pos){
  //     console.group("hover");
  //     pos.preventDefault();
  //     pos.stopPropagation();
  //     var cursorX = pos.clientX;
  //     var downT = pos.clientY;
  //     var $this = $(this);
  //     var partPosition = $this.css(["top", "left"]);
  //
  // });



  // Create a new part
  $(".paper").on("mousedown touchstart", function(pos){

    pos.preventDefault();

    // build part data
    var part = {type: buildtype,};
    if(buildtype === "tank"){
        part.html = "N<br>A<br>S<br>A";
        part.classes = "tank";
    } else if (buildtype === "engine"){
        part.classes = "engine";
    }
    part.appendTo = document.querySelector(".parts");
    part.position = {
      x: pos.pageX || event.touches[0].pageX,
      y: pos.pageY || event.touches[0].pageY,
    },
    part.width =  0;
    part.height =  0;

    // create part
    var partId = RocketScience.part.build(part);

    // Save position data
    var beginDrag = {x: part.position.x, y: part.position.y};

    $("body").on("mousemove touchmove", function(e) {
      $("body").trigger("preview.setsize");
    });


    // Update preview as we drag the part to final size
    $("body").on("preview.setsize", function(e){
      e.preventDefault();

      // WTF. why is there an event named `event` when i explicitly named the event `e` and why when i name the event `event` does it not have the data i need?
      var cursorX = e.pageX || event.pageX || e.clientX || event.clientX || event.touches[0].pageX || e.originalEvent.touches[0].pageX || event.originalEvent.touches[0].pageX || e.originalEvent.touches[0].clientX || event.originalEvent.touches[0].clientX;
      var cursorY = e.pageY|| event.pageY || e.clientY || event.clientY || event.touches[0].pageY || e.originalEvent.touches[0].pageY || event.originalEvent.touches[0].pageY || e.originalEvent.touches[0].clientY || event.originalEvent.touches[0].clientY;
      var partWidth = Math.abs(cursorX - beginDrag.x);
      var partHeight = Math.abs(cursorY - beginDrag.y);

      var left = (beginDrag.x <= cursorX) ? beginDrag.x : cursorX;
      var top = (beginDrag.y <= cursorY) ? beginDrag.y : cursorY;

      var newProps = {
        position: {
          x: left,
          y: top,
        },
        width: partWidth,
        height: partHeight,
        dryWeight: ((partHeight + partWidth)*2),
      }
      newProps.fuelWeight = (partHeight * partWidth);
      newProps.wetWeight = (newProps.dryWeight + newProps.fuelWeight);

      RocketScience.part.update(partId, newProps);
    });
    $("body").one("mouseup touchend touchcancel", function(e){
      // kill drag event listener
      $(this).off("preview.setsize");
      var newProps = {
        classes: "part " + buildtype
      };
      RocketScience.part.update(partId, newProps);
    });
  });
});

// tanks = [];
// //(function(){
//     var Tank = {
//         init : function(){
//             var tankNo = tanks.length;
//             tanks.push("tank" + tankNo);
//             $tank = $('<div>', {class: 'tank', id: tankNo});
//             $('body').append($tank);
//         },
//         some: function(){
//                 console.log("Some");
//         }
//     }
// //})();
//
// Tank.init();
// Tank.some();





/*

(function() {

	var Person = {
var Tank = function(){

	init: function() {
        console.log(tanks);
        console.log(tanks.length);
        tanks.push("tank" + tanks.length);
        console.log(tanks);
        console.log(tanks.length);
        $tank = $('<div>', {class: 'spinner', id: tanks.length});
	},
	bindEvents: function() {
		//this.form.on('submit', $.proxy(this.showName, this));
	},
	showName: function(event) {
		//event.preventDefault();
		//alert(this.form.find('input[type=text]').val());
	}
}
Tank.init();

};

Tank();
*/
