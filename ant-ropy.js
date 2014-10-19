"use strict";

var canvas;
var realctx;
var canvasWidth;
var canvasHeight;
var offCanvas;
var offctx;

var antSpace;
var hive;
var foods;
var ants;
var pheromone;

function init(canvasid) {
    //Canvas stuff
    canvas = $(canvasid)[0];
    realctx = canvas.getContext("2d");
    canvasWidth = $(canvasid).width();
    canvasHeight = $(canvasid).height();
    offCanvas = document.createElement('canvas');
    offCanvas.width = canvasWidth;
    offCanvas.height = canvasHeight;
    offctx = offCanvas.getContext("2d");
    antSpace = new AntSpace(canvasWidth,canvasHeight);
    hive = new Hive();
    hive.draw(offctx);
    foods = new Foods();
    foods.draw(offctx);
    ants = new Ants();
    ants.draw(offctx);
    pheromone = new Pheromone();
    pheromone.draw(offctx);
}

function step() {
    var start = +new Date(); // log start timestamp
    realctx.clearRect(0, 0, canvasWidth, canvasHeight);
    offctx.clearRect(0, 0, canvasWidth, canvasHeight);

    hive.draw(offctx);
    foods.draw(offctx);
    ants.step();
    ants.draw(offctx);
    pheromone.step();
    pheromone.draw(offctx);
    
    realctx.drawImage(offCanvas,0,0);
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("demo").innerHTML = "step cycle: " + diff;
}

function Hive () {
    this.hiveSize = 10;
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    var canvaspoint = antSpace.point2Canvas(antSpace.center());
    ctx.arc(canvaspoint.x,canvaspoint.y,this.hiveSize,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "green";
    ctx.fillRect(canvaspoint.x,canvaspoint.y,10*antSpace.cellSize,10*antSpace.cellSize);
    ctx.moveTo(0,0);
    ctx.lineTo(canvasWidth,canvasHeight);
    ctx.moveTo(canvasWidth,0);
    ctx.lineTo(0,canvasHeight);
    ctx.stroke();
}


