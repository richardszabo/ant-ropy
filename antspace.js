function AntSpace (canvasWidth,canvasHeight) {
    this.spaceWidth = 100;
    this.spaceHeight = 100;
    this.cellWidth = Math.floor(canvasWidth / this.spaceWidth);
    this.cellHeight = Math.floor(canvasHeight / this.spaceHeight);
}

AntSpace.prototype.point2Canvas = function(spacepoint) {
    return new Point(spacepoint.x*this.cellWidth,spacepoint.y*this.cellHeight);
}

AntSpace.prototype.num2Canvas = function(x) {
    return x*this.cellWidth;
}