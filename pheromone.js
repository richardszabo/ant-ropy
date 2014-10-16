function Pheromone() {   
    this.read_matrix = create2DArray(antSpace.spaceSize);
    this.write_matrix = create2DArray(antSpace.spaceSize);
    /*for(var i = 0; i < this.write_matrix.length; ++i ) {
	for(var j = 0; j < antSpace.spaceSize; ++j ) {
	    this.write_matrix[i][j] = Math.round(Math.random()*256) + Math.round(Math.random()*65536) + Math.round(Math.random()*256*65536);
	}
    }*/
}

Pheromone.prototype.step = function() {
    this.calculate();
    this.diffuse();
    this.update();
}

Pheromone.prototype.draw = function(ctx) {
    for(var i = 0; i < this.read_matrix.length; ++i ) {
	for(var j = 0; j < this.read_matrix[i].length; ++j ) {
	    if( this.read_matrix[i][j] !== undefined ) {
		ctx.fillStyle = '#' + this.read_matrix[i][j].toString(16);
		var canvaspoint = antSpace.point2Canvas(new Point(i,j));
		ctx.fillRect(canvaspoint.x,canvaspoint.y,1,1);
	    }
	}
    }
}

Pheromone.prototype.calculate = function() {
    for( var i = 0; i < Ants.antNumber; ++i ) {
	this.write_matrix[ants.ant[i].x][ants.ant[i].y] = ants.ant[i].getEmittedPheromone();	
    }
}

Pheromone.prototype.diffuse = function() {
    // modifying write matrix according to https://supportweb.cs.bham.ac.uk/documentation/java/repast/api/uchicago/src/sim/space/Diffuse2D.html#diffuse%28%29
    // newValue = evap(ownValue + diffusionConstant * (nghAvg - ownValue)) where nghAvg is the weighted average of a cells eight neighbors, and ownValue is the current value for the current cell.
}

Pheromone.prototype.update = function() {
    this.read_matrix = [];
    copy2DArray(this.write_matrix, this.read_matrix);
}

