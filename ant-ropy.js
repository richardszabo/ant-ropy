var canvas;
var ctx;
var width;
var height;
var food;
var foodSize = 5;

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

function init_food() {
    food = new Food();
    food.setX(Math.floor(Math.random() * width));
    food.setY(Math.floor(Math.random() * height));
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.getX(), food.getY(), 5, 5);
}

function Food () {
    this.x = 0;
    this.y = 0;
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

