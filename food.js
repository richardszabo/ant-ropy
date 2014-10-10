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
