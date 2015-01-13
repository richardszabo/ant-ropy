"use strict";

function Antropy () {
    this.inited = false;
    this.antNumber;
}

Antropy.prototype.setCanvases = function(p_canvasid, p_pheromone_canvasid) {
    this.canvasid = p_canvasid;
    this.pheromone_canvasid = p_pheromone_canvasid;
}

Antropy.prototype.reset = function(seed,antnum) {
    Math.seedrandom(seed);
    this.seed = seed;
    this.antNumber = antnum;
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

Antropy.prototype.step = function(seed,antnum) {
    var start = +new Date(); // log start timestamp
    if( !this.inited ) {
        this.reset(seed,antnum);
    }
    this.pheromone.step();
    this.ants.step();

    this.draw();
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("speed").innerHTML = diff;
    document.getElementById("food").innerHTML = this.hive.getFood();
    document.getElementById("ant_food").innerHTML = this.ants.carryingFood;
    document.getElementById("ant_search").innerHTML = this.ants.antNumber - this.ants.carryingFood;
    if( this.ants.selected_ant_id !== null ) {
        document.getElementById("ant_id").innerHTML = this.ants.selected_ant_id;
        var selected_ant = this.ants.ant[this.ants.selected_ant_id];
        document.getElementById("ant_x").innerHTML = selected_ant.x;
        document.getElementById("ant_y").innerHTML = selected_ant.y;
        document.getElementById("ant_mode").innerHTML = selected_ant.mode;
        var foodStr = "";
        var hiveStr = "";
        for( var i = -2; i <= 2; ++i ) {
            for( var j = -2; j <= 2; ++j ) {
                var food = Math.round(antropy.pheromone.getFoodAt(selected_ant.x+i,selected_ant.y+j)*100)/100;
                foodStr += lpad(decimal_pad(food,2,"0")," ",5) + ", ";
                var hive = Math.round(antropy.pheromone.getHiveAt(selected_ant.x+i,selected_ant.y+j)*100)/100;
                hiveStr += lpad(decimal_pad(hive,2,"0")," ",5) + ", ";
            }
            foodStr += "<br />";
            hiveStr += "<br />";
        }
        document.getElementById("food_pheromone").innerHTML = foodStr;
        document.getElementById("hive_pheromone").innerHTML = hiveStr;
    }
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
    var foodStr = "";
    var hiveStr = "";
    for( var i = -1; i <= 1; ++i ) {
	for( var j = -1; j <= 1; ++j ) {
	    var food = Math.round(antropy.pheromone.getFoodAt(point.x+i,point.y+j)*100)/100;
	    foodStr += lpad(decimal_pad(food,2,"0")," ",5) + ", ";
	    var hive = Math.round(antropy.pheromone.getHiveAt(point.x+i,point.y+j)*100)/100;
	    hiveStr += lpad(decimal_pad(hive,2,"0")," ",5) + ", ";
	}
	foodStr += "\n";
	hiveStr += "\n";
    }
    antropy.ants.selectAnt(point);
    //alert("x: " + point.x + "\ny: " + point.y + "\nfood:\n" + foodStr + "\nhive:\n" + hiveStr);
}
