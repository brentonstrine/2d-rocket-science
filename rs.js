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
  console.log("]]]]]]]]]]]]]]]]]]]");
    boxCoords[0] = [pos.clientX,pos.clientY];

//if(boxCoords.length==1){

//console.log(boxCoords.length);
//console.log(boxCoords);

        $(".rec").css({"left": boxCoords[0][0], "top": boxCoords[0][1], "width": 0, "height": 0, display: "flex"});

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
                if(w<0){
                    w = w * -1;
                    $(".rec").css({
                        "left": l,
                        "width": w
                    });
                    } else {
                    $(".rec").css({
                        "width": w
                    });
                }
                if(h<0){
                    h = h * -1;
                    $(".rec").css({
                        "top": t,
                        "height": h
                    });
                } else {
                    $(".rec").css({
                        "height": h
                    });
                }

                var maxfont = 60;
                if (h<=250){
                maxfont = h/5;
                }

                if(w<=60 && 60<=maxfont){
                maxfont = w;
                } else {
                //console.log(maxfont + " > " + w + " < 60" )
                }

                $(".rec").css({
                "font-size": maxfont + "px"
                });


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
                console.log("CLONE!!!!!!")
                $(this).off(".setsize");
                $part = $(".rec");
                var params =
                $part
                .css("display",'')
                .css(["top", "left", "width", "height", "font-size"]);
                //var partname = "part" + parts.length;
                //console.log(partname);
                //parts[partname] = params;
                //console.log(parts);
                //console.log(parts[partname]);


                $part.clone()
                .attr("class","part")
                .appendTo(".parts");
            });
        //}
    //} else {
//        boxCoords = [];
//    }
  });
});

tanks = [];
//(function(){
    var Tank = {
        init : function(){
            var tankNo = tanks.length;
            tanks.push("tank" + tankNo);
            $tank = $('<div>', {class: 'tank', id: tankNo});
            $('body').append($tank);
        },
        some: function(){
                console.log("Some");
        }
    }
//})();

Tank.init();
Tank.some();





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
