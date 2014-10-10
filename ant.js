function Ants () {
    this.antSize = 2;
    this.antNumber = 100;
    this.ant = [];
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i] = new Ant();
    } 
}

// neighbours (order is important!)
Ants.neighbours = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
Ants.NO_HEADINGS = Ants.neighbours.length;
// number of possible directions to move
Ants.STEPS_AHEAD = 3;

Ants.prototype.draw = function(ctx) {
    ctx.strokeStyle = "blue";
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i].draw(ctx);
    } 
}

Ants.prototype.step = function() {
    for(var i = 0; i < this.antNumber; ++i ) {
	this.ant[i].step();
    } 
}

function Ant() {
    var x;
    var y;
    var heading;
    var prevX;
    var prevY;

    this.x = Math.random() * spaceWidth;
    this.y = Math.random() * spaceHeight;
    this.heading = Math.floor(Math.random() * Ants.neighbours.length);
}

Ant.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,ants.antSize,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x+5*Ants.neighbours[this.heading][0],
	       this.y+5*Ants.neighbours[this.heading][1]);
    ctx.stroke();
}

Ant.prototype.step = function() {
    this.randomWalkMode();
    this.x = (this.x + spaceWidth) % spaceWidth; 
    this.y = (this.y + spaceHeight) % spaceHeight; 
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

