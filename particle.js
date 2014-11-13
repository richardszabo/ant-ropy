"use strict";

// -----------------------------------------------------------------------------------------------------
// auxiliary functions

function Particle (xx,yy) {
    this.xpos = xx;
    this.ypos = yy;
}

Particle.prototype = {
    get pos2D() {
	return new Point(this.xpos,this.ypos);
    },
    set pos2D(pos) {
	this.xpos = pos.x;
	this.ypos = pos.y;
    },
    get x() {
	return AntSpace.crop2Space(this.xpos);
    },
    set x(xx) {
	this.xpos = AntSpace.crop2Space(xx);
    },
    get y() {
	return AntSpace.crop2Space(this.ypos);
    },
    set y(yy) {
	this.ypos = AntSpace.crop2Space(yy);
    },
    get canvasPos2D() {
	return AntSpace.point2Canvas(this.pos2D);
    }
};
