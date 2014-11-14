var boxCoords = [];
var parts = {};
$("document").ready(function(){
    // var currentMousePos = { x: -1, y: -1 };
    // $(document).mousemove(function(event) {
    //     currentMousePos.x = event.pageX;
    //     currentMousePos.y = event.pageY;
    //     $("#mousex").html(currentMousePos.x);
    //     $("#mousey").html(currentMousePos.y);
    //
    // });
var buildtype = "tank";

$(".controls").on("click mousedown touchstart", function(e){
    e.stopPropagation();
});
$("#tank").on("click", function(){
    buildtype = "tank";
    $("#nextpart").html(buildtype);
});
$("#engine").on("click", function(){
    buildtype = "engine";
    $("#nextpart").html(buildtype);
});


$(".parts").on("mousedown touchstart", ".part", function(pos){
    console.log("-------------------");
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

console.log(hOffset);
console.log(vOffset);
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


$("body").on("mousedown touchstart", function(pos){
    pos.preventDefault();
    var $fabricating = $(".rec");
    console.log("[[[[[[body mousedown]]]]]]]");
    boxCoords[0] = [pos.clientX,pos.clientY];

    if(buildtype=="tank"){
        $fabricating.html("N<br>A<br>S<br>A").addClass("tank");
    } else {
        $fabricating.addClass("engine");

    }

//if(boxCoords.length==1){

//console.log(boxCoords.length);
//console.log(boxCoords);

        $fabricating.css({"left": boxCoords[0][0], "top": boxCoords[0][1], "width": 0, "height": 0, display: "flex"});

        $(this).on("mousemove.setsize touchmove.setsize", function(e){
            e.preventDefault();
            if(boxCoords.length==1){
                //console.log(boxCoords);
                var l = e.clientX;
                var t = e.clientY;
                var w = l - boxCoords[0][0];
                var h = t - boxCoords[0][1];

                $("#wid").html(w);
                $("#hei").html(h);
                var cursoroffset = 0;
                if(w<0){
                    w = w * -1;
                    $fabricating.css({
                        "left": l - cursoroffset,
                        "width": w
                    });
                } else {
                    $fabricating.css({
                        "width": w + cursoroffset
                    });
                }
                if(h<0){
                    h = h * -1;
                    $fabricating.css({
                        "top": t - cursoroffset,
                        "height": h
                    });
                } else {
                    $fabricating.css({
                        "height": h + cursoroffset
                    });
                }

                if(buildtype=="tank"){
                    var maxfont = 18;
                    if (h<=250){ maxfont = h/5; }
                    if(w<=60 && 60<=maxfont){ maxfont = w; }
                    $fabricating.css({"font-size": maxfont + "px"});
                } else {
                    //get width of engine for this height.
                    var enginewidth = h * .908695;

                    //figure out what the remainder is for leftover rockets at this width
                    var excess = 0;

                    if(w>enginewidth){
                        excess = w % enginewidth;
                    }
                    var rockets = (w / enginewidth);
                    var excessC = w - (rockets*enginewidth);


                    console.log("\r\nrockets: " + Math.floor(rockets) +"/"+ rockets);
                    console.log("excess: " + excess +" / "+ excessC);
                    console.log("width/Rwidth: " + w +" / "+ enginewidth);

                    //var actualrockets = w*Math.floor(rockets);
                    var notrockets = 0;
                    if(excess>0){
                        notrockets = w - excess;
                        console.log("excess:" + excess + " w-e: " + notrockets);
                    }




                    //subtract remainder from actual width (add to padding and remove from width)
                    $fabricating.css({
                        "width": w - excess,
                        "padding-left": excess/2,
                        "padding-right": excess/2
                    });
                }


                var dryWeight = ((w + h)*2);
                var fuelWeight = (w * h);
                var fullWeight = (dryWeight + fuelWeight);
                $("#dryWeight").html(dryWeight + " kg");
                $("#fuelWeight").html(fuelWeight + " kg");
                $("#fullWeight").html(fullWeight + " kg");
            }
        });



        //if(boxCoords.length==2){
            $(this).one("mouseup touchend touchcancel", function(){
                $(this).off(".setsize");
                $fabricating.css(["top", "left", "width", "height", "font-size"]);
                //var partname = "part" + parts.length;
                //console.log(partname);
                //parts[partname] = params;
                //console.log(parts);
                //console.log(parts[partname]);

                var classes = "part " + buildtype;
                $fabricating.clone()
                    .attr("class",classes)
                    .appendTo(".parts");

                $fabricating
                    .html("")
                    .attr("class","rec")
                    .css("display",'');
            });
        //}
    //} else {
//        boxCoords = [];
//    }
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
