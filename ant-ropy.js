"use strict";

var canvas;
var realctx;
var spaceWidth;
var spaceHeight;
var offCanvas;
var offctx;

var hive;
var foods;
var ants;
var pheromone;

function init(canvasid) {
    //Canvas stuff
    canvas = $(canvasid)[0];
    realctx = canvas.getContext("2d");
    spaceWidth = $(canvasid).width();
    spaceHeight = $(canvasid).height();
    offCanvas = document.createElement('canvas');
    offCanvas.width = spaceWidth;
    offCanvas.height = spaceHeight;
    offctx = offCanvas.getContext("2d");
    hive = new Hive();
    hive.draw(offctx);
    foods = new Foods();
    foods.draw(offctx);
    ants = new Ants();
    ants.draw(offctx);
    pheromone = new Pheromone();
}

function step() {
    var start = +new Date(); // log start timestamp
    realctx.clearRect(0, 0, spaceWidth, spaceHeight);
    offctx.clearRect(0, 0, spaceWidth, spaceHeight);

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
    this.hiveSize = 5;
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(spaceWidth/2,spaceHeight/2,this.hiveSize,0,2*Math.PI);
    ctx.fill();
}

function Point () {
    var x;
    var y;
}

function Foods () {
    this.foodSize = 2;
    this.foodNumber = 100;
    this.foodDeviation = 50;
    this.food = [];    

    var foodSource = new Point();
    foodSource.x = Math.floor((gauss_random() + 1 ) / 2 * spaceWidth);
    foodSource.y = Math.floor((gauss_random() + 1 ) / 2 * spaceHeight);
    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(foodSource,this.foodDeviation);
	this.food[i] = new Food();
	this.food[i].x = Math.floor(point.x);
	this.food[i].y = Math.floor(point.y);
   } 
}

Foods.prototype.draw = function(ctx) {
    ctx.fillStyle = "yellow";
    for(var i = 0; i < this.foodNumber; ++i ) {
	this.food[i].draw(ctx);
    }
}

function Food () {
    var x;
    var y;
}

Food.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,foods.foodSize,0,2*Math.PI);
    ctx.fill();
}

