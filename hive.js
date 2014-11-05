"use strict";

function Hive () {
    this.hiveDrawSize = 10;
}

Hive.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    var canvaspoint = antSpace.point2Canvas(antSpace.center());
    ctx.arc(canvaspoint.x,canvaspoint.y,this.hiveDrawSize,0,2*Math.PI);
    ctx.fill();
}

Hive.prototype.isIn = function(pos) {
    var hive = antSpace.center();
    return (pos.x - hive.x) * (pos.x - hive.x) +
	(pos.y - hive.y) * (pos.y - hive.y) <
	this.hiveDrawSize / antSpace.cellSize * this.hiveDrawSize / antSpace.cellSize;
}
