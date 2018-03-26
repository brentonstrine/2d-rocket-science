
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
      pos.preventDefault();
      pos.stopPropagation();

      var downL = pos.clientX;
      var downT = pos.clientY;
      var $this = $(this);
      // console.log($this);
      // console.log($this.attr("style"));
      // console.log($this.css("left"));
      // console.log($this.css("top").replace(/[^-\d\.]/g, ''));
      // console.log($this.css(["top", "left"]));
      var startPos = $this.css(["top", "left"]);
      // console.log(startPos);
      // console.log(startPos["left"]);
      // console.log(startPos["top"]);
      vOffset = downT -startPos["top"].replace(/[^-\d\.]/g, '');;
      hOffset = downL - startPos["left"].replace(/[^-\d\.]/g, '');;

    console.log(hOffset, vOffset);
      console.log("------------------->");
      $("body").on("mousemove.partmove touchmove", function(e){
          //console.log("-movemovemovemovemove-");
          e.preventDefault();
          var moveL = e.clientX;
          var moveT = e.clientY;
          //console.log(moveL-hOffset);
          console.log("mov " + (moveT-vOffset) );
          $this.css({"left": moveL-hOffset, "top": moveT-vOffset});
      });

      $this.one("mouseup touchcancel", function(){
          $("body").off(".partmove");
      });
  });


  // $(".parts").on("mouseenter", ".part", function(pos){
  //     console.group("hover");
  //     pos.preventDefault();
  //     pos.stopPropagation();
  //     var downL = pos.clientX;
  //     var downT = pos.clientY;
  //     var $this = $(this);
  //     var startPos = $this.css(["top", "left"]);
  //     debugger;
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
      x: pos.clientX || pos.originalEvent.touches[0].clientX,
      y: pos.clientY || pos.originalEvent.touches[0].clientY,
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
      var cursorX = e.pageX || event.pageX || e.clientX || event.clientX || e.originalEvent.touches[0].pageX || event.originalEvent.touches[0].pageX || e.originalEvent.touches[0].clientX || event.originalEvent.touches[0].clientX;
      var cursorY = e.pageY|| event.pageY || e.clientY || event.clientY || e.originalEvent.touches[0].pageY || event.originalEvent.touches[0].pageY || e.originalEvent.touches[0].clientY || event.originalEvent.touches[0].clientY;
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
