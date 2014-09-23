"use strict";

var canvas;
var ctx;
var width;
var height;
var hive;
var foods;
var ants;

function init(canvasid) {
    //Canvas stuff
    canvas = $(canvasid)[0];
    ctx = canvas.getContext("2d");
    width = $(canvasid).width();
    height = $(canvasid).height();
    hive = new Hive();
    hive.init();
    foods = new Foods();
    foods.init();
    ants = new Ants();
    ants.init();
}

function Hive () {
    this.hiveSize = 5;
}

Hive.prototype.init = function() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(width/2,height/2,this.hiveSize,0,2*Math.PI);
    ctx.fill();
}

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

function Point () {
    var x;
    var y;
}

function Foods () {
    this.foodSize = 2;
    this.foodNumber = 10;
    this.foodDeviation = 50;
    this.food = [];    
}

Foods.prototype.init = function() {
    ctx.fillStyle = "yellow";
    var foodSource = new Point();
    foodSource.x = Math.floor((gauss_random() + 1 ) / 2 * width);
    foodSource.y = Math.floor((gauss_random() + 1 ) / 2 * height);
    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(foodSource,this.foodDeviation);
	//alert('i:' + i + ' ' + point.x + ' ' + point.y + ':');
	this.food[i] = new Food();
	this.food[i].x = Math.floor(point.x);
	this.food[i].y = Math.floor(point.y);
	ctx.beginPath();
	ctx.arc(this.food[i].x,this.food[i].y,this.foodSize,0,2*Math.PI);
	ctx.fill();
    } 
}

function Food () {
    var x;
    var y;
}

function Ants () {
    this.antSize = 2;
    this.antNumber = 10;
    this.ant = [];
}

Ants.neighbours = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];

Ants.prototype.init = function() {
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i] = new Ant();
	this.ant[i].draw();
    } 
}

function Ant() {
    var x;
    var y;
    var heading;
    var prevX;
    var prevY;

    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.heading = Math.floor(Math.random() * Ants.neighbours.length);
}

Ant.prototype.draw = function() {
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x,this.y,ants.antSize,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x+5*Ants.neighbours[this.heading][0],
	       this.y+5*Ants.neighbours[this.heading][1]);
    ctx.stroke();
}
