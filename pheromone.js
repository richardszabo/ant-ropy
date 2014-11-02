function Pheromone() {   
    this.read_matrix = create2DArray(antSpace.spaceSize);
    this.write_matrix = create2DArray(antSpace.spaceSize);    
    this.evap_rate = 0.01;
    this.diffusion_constant = 0.86;
}

Pheromone.prototype.step = function() {
    this.diffuse();
    this.calculate();
    this.update();
}

Pheromone.prototype.draw = function(ctx) {
// http://stackoverflow.com/a/13916313/21047
    var lastFillValue = 0;
    for(var i = 0; i < this.read_matrix.length; ++i ) {
	for(var j = 0; j < this.read_matrix[i].length; ++j ) {
	    var fillValue = Math.min(Math.round(this.read_matrix[i][j] || 0),255); // for overflow
		    lastFillValue = fillValue;
		    ctx.fillStyle = "rgb(0," + fillValue + ",0)"; 
		var canvaspoint = antSpace.point2Canvas(new Point(i,j));
		ctx.fillRect(canvaspoint.x-antSpace.cellSize/2,canvaspoint.y-antSpace.cellSize/2,antSpace.cellSize,antSpace.cellSize);
	}
    }
}

Pheromone.prototype.calculate = function() {
    for( var i = 0; i < Ants.antNumber; ++i ) {
	this.write_matrix[ants.ant[i].x][ants.ant[i].y] = 
	    (this.write_matrix[ants.ant[i].x][ants.ant[i].y] || 0) + ants.ant[i].getEmittedPheromoneHive();
    }
}

Pheromone.prototype.diffuse = function() {
    // modifying write matrix according to the modified Diffuse2D source code in ant-ropy project
    for(var i = 0; i < this.write_matrix.length; ++i ) {
	for(var j = 0; j < this.write_matrix[i].length; ++j ) {
	    var avg = 0;
	    for( var k = 0; k < 8; ++k ) {
		avg += this.read_matrix[(i + Ants.neighbours[k][0] + antSpace.spaceSize)%antSpace.spaceSize]
		                       [(j + Ants.neighbours[k][1] + antSpace.spaceSize)%antSpace.spaceSize] || 0;
	    }
	    /* value diffusing from neighbours */
            var d = avg/8 * (1 - this.diffusion_constant);
	    /* cell value losing some parts by diffusion */
	    var val = this.diffusion_constant * (this.read_matrix[i][j] || 0);
	    /* cell value getting the value of the neigbours */
	    val += d;
	    /* cell value after evaporation */
	    val *= (1 - this.evap_rate);
	    this.write_matrix[i][j] = val;
	}
    }
}

Pheromone.prototype.update = function() {
    this.read_matrix = [];
    copy2DArray(this.write_matrix, this.read_matrix);
}

