"use strict";

var canvas;
var ctx;
var width;
var height;
var hive;
var foods;

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
}

function Hive () {
    this.hiveSize = 25;
}

Hive.prototype.init = function() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(width/2,height/2,this.hiveSize,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
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
    this.foodSize = 3;
    this.foodNumber = 10;
    this.food = [];    
}

Foods.prototype.init = function() {
    ctx.fillStyle = "yellow";
    var foodSource = new Point();
    foodSource.x = Math.floor((gauss_random() + 1 ) / 2 * width);
    foodSource.y = Math.floor((gauss_random() + 1 ) / 2 * height);
    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(foodSource,50);
	//alert('i:' + i + ' ' + point.x + ' ' + point.y + ':');
	this.food[i] = new Food();
	this.food[i].setX(Math.floor(point.x));
	this.food[i].setY(Math.floor(point.y));
	ctx.beginPath();
	ctx.arc(this.food[i].getX(),this.food[i].getY(),this.foodSize,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
    } 
}

function Food () {
    var x = 0;
    var y = 0;
}
 
Food.prototype.getX = function() {
    return this.x;
};

Food.prototype.getY = function() {
    return this.y;
};

Food.prototype.setX = function(x) {
    return this.x = x;
};

Food.prototype.setY = function(y) {
    return this.y = y;
};

