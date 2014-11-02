function Foods () {
    this.foodSize = 2;
    this.foodNumber = 100;
    this.foodDeviation = 50;
    this.food = [];    

    var foodSource = new Point(Math.floor((gauss_random() + 1 ) / 2 * antSpace.spaceSize),Math.floor((gauss_random() + 1 ) / 2 * antSpace.spaceSize));
    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(foodSource,this.foodDeviation);
	this.food[i] = new Food();
	this.food[i].pos2D = antSpace.crop2Space(new Point(Math.floor(point.x),Math.floor(point.y)));
   } 
}

Foods.prototype.draw = function(ctx) {
    ctx.fillStyle = "yellow";
    for(var i = 0; i < this.foodNumber; ++i ) {
	this.food[i].draw(ctx);
    }
}

function Food () {
    this.x = 0;
    this.y = 0;
}

Food.prototype = {
    get pos2D() {
	return new Point(this.x,this.y);
    },
    set pos2D(pos) {
	this.x = pos.x;
	this.y = pos.y;
    }
};


Food.prototype.draw = function(ctx) {
    ctx.beginPath();
    var canvaspoint = antSpace.point2Canvas(this.pos2D);
    ctx.arc(canvaspoint.x,canvaspoint.y,foods.foodSize,0,2*Math.PI);
    ctx.fill();
}
