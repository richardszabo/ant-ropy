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

function Ants () {
    this.antSize = 2;
    this.antNumber = 100;
    this.ant = [];
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i] = new Ant();
    } 
}

// neighbours (order is important!)
Ants.neighbours = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
Ants.NO_HEADINGS = Ants.neighbours.length;
// number of possible directions to move
Ants.STEPS_AHEAD = 3;

Ants.prototype.draw = function(ctx) {
    ctx.strokeStyle = "blue";
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i].draw(ctx);
    } 
}

Ants.prototype.step = function() {
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i].step();
    } 
}

function Ant() {
    var x;
    var y;
    var heading;
    var prevX;
    var prevY;

    this.x = Math.random() * spaceWidth;
    this.y = Math.random() * spaceHeight;
    this.heading = Math.floor(Math.random() * Ants.neighbours.length);
}

Ant.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,ants.antSize,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x+5*Ants.neighbours[this.heading][0],
	       this.y+5*Ants.neighbours[this.heading][1]);
    ctx.stroke();
}

Ant.prototype.step = function() {
    this.randomWalkMode();
    this.x = (this.x + spaceWidth) % spaceWidth; 
    this.y = (this.y + spaceHeight) % spaceHeight; 
}

Ant.prototype.randomWalkMode = function() {
    var dir = gauss_random();
    //alert('dir:' + dir + ':');
//    alert("new dir:" + dir + ":" + Math.round(dir) + ":" + Math.abs(Math.round(dir)) + ":" + 
//sign(dir)*Math.min(Math.abs(Math.round(dir)),Ants.STEPS_AHEAD/2) + ":");
    this.heading = Math.floor(this.heading +
		   sign(dir)*Math.min(Math.abs(Math.round(dir)),Ants.STEPS_AHEAD/2) +
                   Ants.NO_HEADINGS) % Ants.NO_HEADINGS;
    //alert('heading:' + this.heading + ':');
    this.x += Ants.neighbours[this.heading][0];
    this.y += Ants.neighbours[this.heading][1];
}

