function Ants () {
    this.antSize = 3;
    this.ant = [];
    for(var i = 0; i < Ants.antNumber; ++i ) {
	this.ant[i] = new Ant();
    } 
}

Ants.antNumber = 100;
// neighbours (order is important!)
Ants.neighbours = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
Ants.NO_HEADINGS = Ants.neighbours.length;
// number of possible directions to move
Ants.STEPS_AHEAD = 3;

Ants.prototype.draw = function(ctx) {
    ctx.strokeStyle = "blue";
    for(var i = 0; i < Ants.antNumber; ++i ) {
	this.ant[i].draw(ctx);
    } 
}

Ants.prototype.step = function() {
    for(var i = 0; i < Ants.antNumber; ++i ) {
	this.ant[i].step();
    } 
}

function Ant() {
    this.x = Math.floor(Math.random() * antSpace.spaceSize);
    this.y = Math.floor(Math.random() * antSpace.spaceSize);
    this.heading = Math.floor(Math.random() * Ants.neighbours.length);
}

Ant.prototype.draw = function(ctx) {
    ctx.beginPath();
    var canvaspoint = antSpace.point2Canvas(new Point(this.x,this.y));
    ctx.arc(canvaspoint.x,canvaspoint.y,ants.antSize,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvaspoint.x,canvaspoint.y);
    ctx.lineTo(canvaspoint.x+5*Ants.neighbours[this.heading][0],
	       canvaspoint.y+5*Ants.neighbours[this.heading][1]);
    ctx.stroke();
}

Ant.prototype.step = function() {
    this.randomWalkMode();
    var cpoint = antSpace.crop2Space(new Point(this.x,this.y));
    this.x = cpoint.x;
    this.y = cpoint.y;
}

Ant.prototype.randomWalkMode = function() {
    var dir = gauss_random();
    //alert('dir:' + dir + ':');
//    alert("new dir:" + dir + ":" + Math.round(dir) + ":" + Math.abs(Math.round(dir)) + ":" + 
//sign(dir)*Math.min(Math.abs(Math.round(dir)),Ants.STEPS_AHEAD/2) + ":");
    this.heading = Math.floor(this.heading +
		   sign(dir)*Math.min(Math.abs(Math.round(dir)),Ants.STEPS_AHEAD/2) +
                   Ants.NO_HEADINGS) % Ants.NO_HEADINGS;
    //alert('heading:' + this.heading + ':');
    this.x += Ants.neighbours[this.heading][0];
    this.y += Ants.neighbours[this.heading][1];
}

Ant.prototype.getEmittedPheromone = function() {
    return 200;
}

