"use strict";

function Antropy () {
    this.inited = false;
}

Antropy.prototype.setCanvases = function(p_canvasid, p_pheromone_canvasid) {
    this.canvasid = p_canvasid;
    this.pheromone_canvasid = p_pheromone_canvasid; 
}

Antropy.prototype.reset = function(seed) {
    Math.seedrandom(seed);
    this.inited = false;
    this.init();
}

Antropy.prototype.init = function() {
    //Canvas stuff
    this.canvas = new CanvasData(this.canvasid);
    this.canvas.realcanvas.addEventListener("mousedown", this.showCellData, false);
    this.canvas.realcanvas.ownParam = this;

    this.pheromone_canvas = new CanvasData(this.pheromone_canvasid);

    this.antSpace = new AntSpace(this.canvas.width,this.canvas.height);

    this.hive = new Hive();
    this.foods = new Foods();
    this.pheromone = new Pheromone(this);
    this.ants = new Ants(this);
    
    this.inited = true;
    this.draw();
}

Antropy.prototype.step = function(seed) {
    var start = +new Date(); // log start timestamp
    if( !this.inited ) {
	this.reset(seed);
    }
    this.pheromone.step();
    this.ants.step();
    
    this.draw();
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("speed").innerHTML = diff;
    document.getElementById("food").innerHTML = this.hive.getFood();
    document.getElementById("ant_food").innerHTML = this.ants.carryingFood;
    document.getElementById("ant_search").innerHTML = Ants.antNumber - this.ants.carryingFood;
}

Antropy.prototype.draw = function() {
    this.canvas.clear();
    this.pheromone_canvas.clear();

    this.hive.draw(this.canvas.context);
    this.foods.draw(this.canvas.context);
    this.pheromone.draw(this.pheromone_canvas.context);
    this.ants.draw(this.canvas.context);

    this.canvas.paint();
    this.pheromone_canvas.paint();
}

Antropy.prototype.showCellData = function(event) {
    var point = AntSpace.canvas2Point(new Point(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop));
    var antropy = event.target.ownParam;
    var food = Math.round(antropy.pheromone.getFoodAt(point.x,point.y)*100)/100;
    var hive = Math.round(antropy.pheromone.getHiveAt(point.x,point.y)*100)/100;
    alert("x: " + point.x + "\ny: " + point.y + "\nfood: " + food + "\nhive: " + hive);
    alert(seed);
}
