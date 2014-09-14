var canvas;
var ctx;
var width;
var height;
var foodNumber = 10;
var food = [];
var cellSize = 5;

function init(canvasid) {
    //Canvas stuff
    canvas = $(canvasid)[0];
    ctx = canvas.getContext("2d");
    width = $(canvasid).width();
    height = $(canvasid).height();
    init_hive();
    init_food();
}

function init_hive() {
    ctx.fillStyle = "red";
    ctx.fillRect(width/2-10, height/2-10,20, 20);
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

function init_food() {
    ctx.fillStyle = "yellow";
    var foodSource = new Point();
    foodSource.x = Math.floor((gauss_random() + 1 ) / 2 * width);
    foodSource.y = Math.floor((gauss_random() + 1 ) / 2 * height);
    for(i = 0; i < foodNumber; ++i ) {
	var point = get2DGaussian(foodSource,50);
	//alert('i:' + i + ' ' + point.x + ' ' + point.y + ':');
	food[i] = new Food();
	food[i].setX(Math.floor(point.x));
	food[i].setY(Math.floor(point.y));
	ctx.fillRect(food[i].getX(), food[i].getY(), cellSize, cellSize);
    } 
}

function Point () {
    var x;
    var y;
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

