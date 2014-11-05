"use strict";

function CanvasData (canvasid) {
    this.canvas = $(canvasid)[0];
    this.ctx = canvas.getContext("2d");
    this.width = $(canvasid).width();
    this.height = $(canvasid).height();
}

CanvasData.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}