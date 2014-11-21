"use strict";

function Antropy () {
    Math.seedrandom('alma');
    this.antSpace;
    this.hive = new Hive();
    this.foods = new Foods();
    this.pheromone = new Pheromone(this);
    this.ants = new Ants(this);
    this.canvas; 
    this.pheromone_canvas; 
}

Antropy.prototype.init = function(canvasid, pheromone_canvasid) {
    //Canvas stuff
    this.canvas = new CanvasData(canvasid);
    this.canvas.realcanvas.addEventListener("mousedown", this.showCellData, false);
    this.canvas.realcanvas.ownParam = this;

    this.pheromone_canvas = new CanvasData(pheromone_canvasid);

    this.antSpace = new AntSpace(this.canvas.width,this.canvas.height);
    this.hive.draw(this.canvas.context);
    this.foods.draw(this.canvas.context);
    this.pheromone.draw(this.pheromone_canvas.context);
    this.ants.draw(this.canvas.context);
}

Antropy.prototype.step = function() {
    var start = +new Date(); // log start timestamp
    this.canvas.clear();
    this.pheromone_canvas.clear();

    this.hive.draw(this.canvas.context);
    this.pheromone.step();
    this.pheromone.draw(this.pheromone_canvas.context);
    this.ants.step();
    this.ants.draw(this.canvas.context);
    this.foods.draw(this.canvas.context);
    
    this.canvas.draw();
    this.pheromone_canvas.draw();
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("speed").innerHTML = "step cycle: " + diff;
    document.getElementById("food").innerHTML = " food collected:" + this.hive.getFood();
}

Antropy.prototype.showCellData = function(event) {
    var point = AntSpace.canvas2Point(new Point(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop));
    var antropy = event.target.ownParam;
    var food = Math.round(antropy.pheromone.getFoodAt(point.x,point.y)*100)/100;
    var hive = Math.round(antropy.pheromone.getHiveAt(point.x,point.y)*100)/100;
    alert("x: " + point.x + "\ny: " + point.y + "\nfood: " + food + "\nhive: " + hive);
}
