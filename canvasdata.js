"use strict";

function CanvasData (canvas) {
    //alert(canvasid);
    this.canvas = canvas; //document.getElementById(canvasid);
    this.ctx = canvas.getContext('2d');
    
    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = this.canvas.width;
    this.offCanvas.height = this.canvas.height;
    this.offctx = this.offCanvas.getContext("2d");
}

CanvasData.prototype = {
    get context() {
	return this.offctx;
    }
}

CanvasData.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.offctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

CanvasData.prototype.draw = function() {
    this.ctx.drawImage(this.offCanvas,0,0);
}
