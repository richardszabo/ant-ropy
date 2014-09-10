var canvas;
var ctx;
var w;
var h;

function init(canvasid) {
    //Canvas stuff
    canvas = $(canvasid)[0];
    ctx = canvas.getContext("2d");
    w = $(canvasid).width();
    h = $(canvasid).height();
    init_hive();
    init_food();
}

function init_hive() {
    ctx.fillStyle = "red";
    ctx.fillRect(w/2-10, h/2-10,20, 20);
}

function init_food() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(w/2-20, h/2-20,5, 5);
}
