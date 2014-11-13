"use strict";

Hive.prototype = Object.create(Particle.prototype);
Hive.prototype.constructor = Hive;

function Hive () {
    this.hiveDrawSize = 10;
    this.pos2D = AntSpace.center();
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "blue";
    Particle.prototype.draw.call(this,ctx,this.hiveDrawSize);
}

Hive.prototype.isIn = function(pos) {
    return (pos.x - this.x) * (pos.x - this.x) +
	(pos.y - this.y) * (pos.y - this.y) <
	this.hiveDrawSize / AntSpace.cellSize * this.hiveDrawSize / AntSpace.cellSize;
}
