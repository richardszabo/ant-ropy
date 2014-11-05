"use strict";

function Hive () {
    this.hiveDrawSize = 10;
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    var canvaspoint = AntSpace.point2Canvas(AntSpace.center());
    ctx.arc(canvaspoint.x,canvaspoint.y,this.hiveDrawSize,0,2*Math.PI);
    ctx.fill();
}

Hive.prototype.isIn = function(pos) {
    var hive = AntSpace.center();
    return (pos.x - hive.x) * (pos.x - hive.x) +
	(pos.y - hive.y) * (pos.y - hive.y) <
	this.hiveDrawSize / AntSpace.cellSize * this.hiveDrawSize / AntSpace.cellSize;
}
