"use strict";

Hive.prototype = Object.create(Particle.prototype);
Hive.prototype.constructor = Hive;

function Hive () {
    this.hiveDrawSize = 10;
    this.pos2D = AntSpace.center();
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    var canvaspoint = AntSpace.point2Canvas(this.pos2D);
    ctx.arc(canvaspoint.x,canvaspoint.y,this.hiveDrawSize,0,2*Math.PI);
    ctx.fill();
}

Hive.prototype.isIn = function(pos) {
    return (pos.x - this.x) * (pos.x - this.x) +
	(pos.y - this.y) * (pos.y - this.y) <
	this.hiveDrawSize / AntSpace.cellSize * this.hiveDrawSize / AntSpace.cellSize;
}
