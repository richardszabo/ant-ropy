"use strict";

function CanvasData (canvas) {
    //alert(canvasid);
    this.canvas = canvas; //document.getElementById(canvasid);
    this.ctx = canvas.getContext('2d');
}

CanvasData.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}