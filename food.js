"use strict";

Foods.prototype = Object.create(Particle.prototype);
Foods.prototype.constructor = Foods;

function Foods () {
    this.foodNumber = 100;
    this.foodDeviation = 5;
    this.food = [];
    this.pos2D = new Point(Math.floor(Math.random() * AntSpace.spaceSize),Math.floor(Math.random() * AntSpace.spaceSize));

    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(this.pos2D,this.foodDeviation);
	this.food[i] = new Food();
	this.food[i].pos2D = new Point(AntSpace.crop2Space(Math.floor(point.x)),AntSpace.crop2Space(Math.floor(point.y)));
   }
}

Foods.prototype = {
    get maxFood() {
        return this.foodNumber;
    },
    set maxFood(fn) {
        this.foodNumber = fn;
    }
};

Foods.foodSize = 2;

Foods.prototype.getFoodAt = function(pos) {
    var found = 0;
    for(var i = 0; i < this.foodNumber && !found; ++i ) {
	if( !this.food[i].consumed && this.food[i].x === pos.x && this.food[i].y === pos.y ) {
	    found = i + 1;
	    this.food[i].consumed = true;
	}
    }
    return found;
}

Foods.prototype.setFoodPos = function(ii,pos) {
    if( ii > 0 && ii <= this.foodNumber ) {
	this.food[ii-1].pos2D = pos;
    }
}

Foods.prototype.draw = function(ctx) {
    ctx.fillStyle = "green";
    for(var i = 0; i < this.foodNumber; ++i ) {
	this.food[i].draw(ctx,Foods.foodSize);
    }
}

Food.prototype = Object.create(Particle.prototype);
Food.prototype.constructor = Food;

function Food () {
    this.x = 0;
    this.y = 0;
    this.consumed = false;
}
