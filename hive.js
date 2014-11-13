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
    ctx.arc(this.canvasPos2D.x,this.canvasPos2D.y,this.hiveDrawSize,0,2*Math.PI);
    ctx.fill();
}

Hive.prototype.isIn = function(pos) {
    return (pos.x - this.x) * (pos.x - this.x) +
	(pos.y - this.y) * (pos.y - this.y) <
	this.hiveDrawSize / AntSpace.cellSize * this.hiveDrawSize / AntSpace.cellSize;
}
