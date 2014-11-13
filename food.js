"use strict";

function Foods () {
    this.foodNumber = 100;
    this.foodDeviation = 20;
    this.food = [];    
    this.foodSource = new Point(Math.floor(Math.random() * AntSpace.spaceSize),Math.floor(Math.random() * AntSpace.spaceSize));
    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(this.foodSource,this.foodDeviation);
	this.food[i] = new Food();
	this.food[i].pos2D = AntSpace.crop2Space(new Point(Math.floor(point.x),Math.floor(point.y)));
   } 
}

Foods.foodSize = 2;

Foods.prototype.getFoodAt = function(pos) {
    var found = false;
    for(var i = 0; i < this.foodNumber && !found; ++i ) {
	if( this.food[i].x === pos.x && this.food[i].y === pos.y ) {
	    found = true;
	}
    }
    return found;
}

Foods.prototype.draw = function(ctx) {
    ctx.fillStyle = "green";
    for(var i = 0; i < this.foodNumber; ++i ) {
	this.food[i].draw(ctx);
    }
    ctx.fillStyle = "brown";
    ctx.beginPath();
    var canvaspoint = AntSpace.point2Canvas(this.foodSource);
    ctx.arc(canvaspoint.x,canvaspoint.y,Foods.foodSize+1,0,2*Math.PI);
    ctx.fill();    
}

Food.prototype = Object.create(Particle.prototype);
Food.prototype.constructor = Food;

function Food () {
    this.x = 0;
    this.y = 0;
}

Food.prototype.draw = function(ctx) {
    ctx.beginPath();
    var canvaspoint = AntSpace.point2Canvas(this.pos2D);
    ctx.arc(canvaspoint.x,canvaspoint.y,Foods.foodSize,0,2*Math.PI);
    ctx.fill();
}
