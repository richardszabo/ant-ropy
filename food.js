function Foods () {
    this.foodSize = 1;
    this.foodNumber = 100;
    this.foodDeviation = 50;
    this.food = [];    

    var foodSource = new Point(Math.floor((gauss_random() + 1 ) / 2 * antSpace.spaceWidth),Math.floor((gauss_random() + 1 ) / 2 * antSpace.spaceHeight));
    for(var i = 0; i < this.foodNumber; ++i ) {
	var point = get2DGaussian(foodSource,this.foodDeviation);
	this.food[i] = new Food();
	this.food[i].x = (Math.floor(point.x) + antSpace.spaceWidth) % antSpace.spaceWidth; 
	this.food[i].y = (Math.floor(point.y) + antSpace.spaceHeight) % antSpace.spaceHeight; 
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
    var canvaspoint = antSpace.point2Canvas(new Point(this.x,this.y));
    ctx.arc(canvaspoint.x,canvaspoint.y,antSpace.num2Canvas(foods.foodSize),0,2*Math.PI);
    ctx.fill();
}
