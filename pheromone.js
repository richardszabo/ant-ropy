function Pheromone() {   
    this.read_matrix = create2DArray(antSpace.spaceSize/10);
    this.write_matrix = create2DArray(antSpace.spaceSize/10);
    for(var i = 0; i < this.write_matrix.length; ++i ) {
	for(var j = 0; j < antSpace.spaceSize/10; ++j ) {
	    this.write_matrix[i][j] = Math.round(Math.random()*256) + Math.round(Math.random()*65536) + Math.round(Math.random()*256*65536);
	}
    }
}

Pheromone.prototype.step = function() {
    this.diffuse();
    this.update();
}

Pheromone.prototype.draw = function(ctx) {
    for(var i = 0; i < this.read_matrix.length; ++i ) {
	for(var j = 0; j < this.read_matrix[i].length; ++j ) {
	    if( this.read_matrix[i][j] !== undefined ) {
		ctx.fillStyle = '#' + this.read_matrix[i][j].toString(16);
		ctx.fillRect(5*i,5*j,5,5);
	    }
	}
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

