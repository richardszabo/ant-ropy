"use strict";

// -----------------------------------------------------------------------------------------------------
// auxiliary functions

function Particle (xx,yy) {
    this.x = xx;
    this.y = yy;
}

Particle.prototype = {
    get pos2D() {
	return new Point(this.x,this.y);
    },
    set pos2D(pos) {
	this.x = pos.x;
	this.y = pos.y;
    }
};
