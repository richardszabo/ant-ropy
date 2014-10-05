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

function Pheromone() {   
    this.read_matrix = create2DArray(10); //spaceWidth);
    this.write_matrix = create2DArray(10); //spaceWidth);
    for(var i = 0; i < this.write_matrix.length; ++i ) {
	for(var j = 0; j < 10 /* spaceHeight */; ++j ) {
	    this.write_matrix[i][j] = Math.round(Math.random()*256) + Math.round(Math.random()*65536) + Math.round(Math.random()*256*65536);
	}
    }
}

Pheromone.prototype.step = function() {
    this.diffuse();
    this.update();
}

Pheromone.prototype.draw = function(ctx) {
    for(var i = 0; i < this.read_matrix.length; ++i ) {
	for(var j = 0; j < this.read_matrix[i].length; ++j ) {
	    if( this.read_matrix[i][j] !== undefined ) {
		if( i === 2 && j === 2 ) {
		    //alert("read:" + this.read_matrix[i][j] + ":" + this.read_matrix[i][j].toString(16) + ":");
		} 
		ctx.fillStyle = this.read_matrix[i][j].toString(16);
		ctx.fillRect(i,j,1,1);
	    }
	}
    }
}

Pheromone.prototype.diffuse = function() {
    // modifying write matrix according to https://supportweb.cs.bham.ac.uk/documentation/java/repast/api/uchicago/src/sim/space/Diffuse2D.html#diffuse%28%29
    // newValue = evap(ownValue + diffusionConstant * (nghAvg - ownValue)) where nghAvg is the weighted average of a cells eight neighbors, and ownValue is the current value for the current cell.
}

Pheromone.prototype.update = function() {
    this.read_matrix = [];
    copy2DArray(this.write_matrix, this.read_matrix);
}

// -----------------------------------------------------------------------------------------------------
// auxiliary functions
//
// quasi-normal distribution [-1,1) 
function gauss_random() {
    // http://stackoverflow.com/a/20161247/21047 and http://jsfiddle.net/Guffa/tvt5K/
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()-3)) / 3;
} 

function get2DGaussian(mean, deviation) {
    var point = new Point();
    point.x = (gauss_random() + 1) / 2 * deviation + mean.x;
    point.y = (gauss_random() + 1) / 2 * deviation + mean.y;
    return point;
}

function sign(x) {
    // http://stackoverflow.com/q/7624920/21047
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function copy2DArray(src, dest){
    var elem;
    for(elem in src){
	dest.push(src[elem].slice());
    }
}