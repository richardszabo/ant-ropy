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

function Antropy () {
    this.antSpace;
    this.hive = new Hive();
    this.foods = new Foods();
    this.pheromone = new Pheromone(this);
    this.ants = new Ants(this);
}

Antropy.prototype.init = function(canvasid,pheromone_canvasid) {
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

    this.antSpace = new AntSpace(canvasWidth,canvasHeight);
    this.hive.draw(offctx);
    this.foods.draw(offctx);
    this.pheromone.draw(pheromone_offctx);
    this.ants.draw(offctx);
}

Antropy.prototype.step = function() {
    var start = +new Date(); // log start timestamp
    realctx.clearRect(0, 0, canvasWidth, canvasHeight);
    offctx.clearRect(0, 0, canvasWidth, canvasHeight);
    pheromone_realctx.clearRect(0, 0, canvasWidth, canvasHeight);
    pheromone_offctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.hive.draw(offctx);
    this.foods.draw(offctx);
    this.ants.step();
    this.ants.draw(offctx);
    this.pheromone.step();
    this.pheromone.draw(pheromone_offctx);
    
    realctx.drawImage(offCanvas,0,0);
    pheromone_realctx.drawImage(pheromone_offCanvas,0,0);
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("demo").innerHTML = "step cycle: " + diff;
}

