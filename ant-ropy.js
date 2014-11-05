"use strict";

var offCanvas;
var offctx;

var pheromone_offCanvas;
var pheromone_offctx;

function Antropy () {
    this.antSpace;
    this.hive = new Hive();
    this.foods = new Foods();
    this.pheromone = new Pheromone(this);
    this.ants = new Ants(this);
    this.canvas; 
    this.pheromone_canvas; 
}

Antropy.prototype.init = function(canvasid, pheromone_canvasid) {
    //Canvas stuff
    this.canvas = document.getElementById(canvasid);
    this.canvas_c = new CanvasData(this.canvas);

    offCanvas = document.createElement('canvas');
    offCanvas.width = this.canvas.width;
    offCanvas.height = this.canvas.height;
    offctx = offCanvas.getContext("2d");

    this.pheromone_canvas = document.getElementById(pheromone_canvasid);
    this.pheromone_canvas_c = new CanvasData(this.pheromone_canvas);
    //alert("pheromone_canvasid:" + pheromone_canvasid +":");
    //this.pheromone_canvas = document.getElementById(pheromone_canvasid); // $(pheromone_canvasid)[0]; 
    //this.pheromone_ctx = pheromone_canvas.getContext("2d");

    pheromone_offCanvas = document.createElement('canvas');
    pheromone_offCanvas.width = this.canvas.width;
    pheromone_offCanvas.height = this.canvas.height;
    pheromone_offctx = pheromone_offCanvas.getContext("2d");

    this.antSpace = new AntSpace(this.canvas.width,this.canvas.height);
    this.hive.draw(offctx);
    this.foods.draw(offctx);
    this.pheromone.draw(pheromone_offctx);
    this.ants.draw(offctx);
}

Antropy.prototype.step = function() {
    var start = +new Date(); // log start timestamp
    this.canvas_c.clear();
    offctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pheromone_canvas_c.clear();
    //this.pheromone_ctx.clearRect(0, 0, this.pheromone_canvas.width, this.pheromone_canvas.height);
    pheromone_offctx.clearRect(0, 0, this.pheromone_canvas.width, this.pheromone_canvas.height);

    this.hive.draw(offctx);
    this.foods.draw(offctx);
    this.ants.step();
    this.ants.draw(offctx);
    this.pheromone.step();
    this.pheromone.draw(pheromone_offctx);
    
    this.canvas_c.ctx.drawImage(offCanvas,0,0);
    this.pheromone_canvas_c.ctx.drawImage(pheromone_offCanvas,0,0);
    //this.pheromone_ctx.drawImage(pheromone_offCanvas,0,0);
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("demo").innerHTML = "step cycle: " + diff;
}

