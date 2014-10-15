function AntSpace (canvasWidth,canvasHeight) {
    this.spaceSize = 100;
    this.cellSize = Math.floor(Math.min(canvasWidth,canvasHeight) / this.spaceSize);
}

AntSpace.prototype.point2Canvas = function(spacepoint) {
    return new Point(spacepoint.x*this.cellSize,spacepoint.y*this.cellSize);
}

AntSpace.prototype.center = function() {
    return new Point(this.spaceSize/2,this.spaceSize/2);
}

AntSpace.prototype.num2Canvas = function(x) {
    return x*this.cellSize;
}

AntSpace.prototype.crop2Space = function(point) {
    return new Point((point.x + this.spaceSize) % this.spaceSize,(point.y + this.spaceSize) % this.spaceSize);
}
