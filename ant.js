"use strict";

function Ants () {
    this.ant = [];
    for(var i = 0; i < Ants.antNumber; ++i ) {
	this.ant[i] = new Ant();
    } 
}

Ants.ANT_SIZE = 3;
// neighbours (order is important!)
Ants.NEIGHBOURS = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
Ants.NO_HEADINGS = Ants.NEIGHBOURS.length;
// number of possible directions to move
Ants.STEPS_AHEAD = 3;
Ants.STARTING_PHEROMONE = 100;
Ants.PHEROMONE_DECREASE = 2;

Ants.antNumber = 100;

Ants.prototype.draw = function(ctx) {
    ctx.strokeStyle = "blue";
    for(var i = 0; i < Ants.antNumber; ++i ) {
	this.ant[i].draw(ctx);
    } 
}

Ants.prototype.step = function() {
    for(var i = 0; i < Ants.antNumber; ++i ) {
	this.ant[i].step();
    } 
}

function Ant() {
    this.x = Math.floor(Math.random() * antSpace.spaceSize);
    this.y = Math.floor(Math.random() * antSpace.spaceSize);
    this.heading = Math.floor(Math.random() * Ants.NEIGHBOURS.length);
    this.pheromoneHive = 0;
    this.hasFood = false;
    this.pheromoneFood = 0;
}

Ant.prototype = {
    get pos2D() {
	return new Point(this.x,this.y);
    },
    set pos2D(pos) {
	this.x = pos.x;
	this.y = pos.y;
    }
};

Ant.prototype.draw = function(ctx) {
    ctx.beginPath();
    var canvaspoint = antSpace.point2Canvas(this.pos2D);
    ctx.arc(canvaspoint.x,canvaspoint.y,Ants.ANT_SIZE,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvaspoint.x,canvaspoint.y);
    ctx.lineTo(canvaspoint.x+5*Ants.NEIGHBOURS[this.heading][0],
	       canvaspoint.y+5*Ants.NEIGHBOURS[this.heading][1]);
    ctx.stroke();
}

Ant.prototype.step = function() {
    this.randomWalkMode();
    this.pos2D = antSpace.crop2Space(this.pos2D);
}

Ant.prototype.randomWalkMode = function() {
    var dir = gauss_random();
    this.heading = Math.floor(this.heading +
		   sign(dir)*Math.min(Math.abs(Math.round(dir)),Ants.STEPS_AHEAD/2) +
                   Ants.NO_HEADINGS) % Ants.NO_HEADINGS;
    //alert('heading:' + this.heading + ':');
    this.x += Ants.NEIGHBOURS[this.heading][0];
    this.y += Ants.NEIGHBOURS[this.heading][1];
    this.foodCheck();
    if( hive.isIn(this.pos2D) ) {
	this.pheromoneHive = Ants.STARTING_PHEROMONE;
    }
}

Ant.prototype.foodCheck = function() {
    if( this.hasFood ) {
	return false;
    }
    if( foods.getFoodAt(this.pos2D) ) {
	this.hasFood = true;
	this.pheromoneFood = Ants.STARTING_PHEROMONE;
	return true;
    }
    return false;
}

Ant.prototype.getEmittedPheromoneHive = function() {
    var ph = this.pheromoneHive;
    this.pheromoneHive = Math.max(0,this.pheromoneHive - Ants.PHEROMONE_DECREASE);
    return ph;
}

Ant.prototype.getEmittedPheromoneFood = function() {
    if( this.hasFood ) {
	var pf = this.pheromoneFood;
	this.pheromoneFood = Math.max(0,this.pheromoneFood - Ants.PHEROMONE_DECREASE);
	return pf;
    }
    return 0;
}

