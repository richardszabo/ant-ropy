"use strict";

var canvas;
var realctx;
var canvasWidth;
var canvasHeight;
var offCanvas;
var offctx;

var pheromone_canvas;
var pheromone_realctx;
var pheromone_offCanvas;
var pheromone_offctx;

var antSpace;
var hive;
var foods;
var ants;
var pheromone;

function init(canvasid,pheromone_canvasid) {
    //Canvas stuff
    canvas = $(canvasid)[0];
    realctx = canvas.getContext("2d");
    canvasWidth = $(canvasid).width();
    canvasHeight = $(canvasid).height();
    offCanvas = document.createElement('canvas');
    offCanvas.width = canvasWidth;
    offCanvas.height = canvasHeight;
    offctx = offCanvas.getContext("2d");

    pheromone_canvas = $(pheromone_canvasid)[0];
    pheromone_realctx = pheromone_canvas.getContext("2d");
    pheromone_offCanvas = document.createElement('canvas');
    pheromone_offCanvas.width = canvasWidth;
    pheromone_offCanvas.height = canvasHeight;
    pheromone_offctx = pheromone_offCanvas.getContext("2d");

    antSpace = new AntSpace(canvasWidth,canvasHeight);
    hive = new Hive();
    hive.draw(offctx);
    foods = new Foods();
    foods.draw(offctx);
    pheromone = new Pheromone();
    pheromone.draw(pheromone_offctx);
    ants = new Ants();
    ants.draw(offctx);
}

function step() {
    var start = +new Date(); // log start timestamp
    realctx.clearRect(0, 0, canvasWidth, canvasHeight);
    offctx.clearRect(0, 0, canvasWidth, canvasHeight);
    pheromone_realctx.clearRect(0, 0, canvasWidth, canvasHeight);
    pheromone_offctx.clearRect(0, 0, canvasWidth, canvasHeight);

    hive.draw(offctx);
    foods.draw(offctx);
    ants.step();
    ants.draw(offctx);
    pheromone.step();
    pheromone.draw(pheromone_offctx);
    
    realctx.drawImage(offCanvas,0,0);
    pheromone_realctx.drawImage(pheromone_offCanvas,0,0);
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("demo").innerHTML = "step cycle: " + diff;
}

function Hive () {
    this.hiveDrawSize = 10;
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    var canvaspoint = antSpace.point2Canvas(antSpace.center());
    ctx.arc(canvaspoint.x,canvaspoint.y,this.hiveDrawSize,0,2*Math.PI);
    ctx.fill();
}

Hive.prototype.isIn = function(pos) {
    var hive = antSpace.center();
    return (pos.x - hive.x) * (pos.x - hive.x) +
	(pos.y - hive.y) * (pos.y - hive.y) <
	this.hiveDrawSize / antSpace.cellSize * this.hiveDrawSize / antSpace.cellSize;
}

