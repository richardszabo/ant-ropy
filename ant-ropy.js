"use strict";

function Antropy () {
    this.antSpace;
    this.hive = new Hive();
    this.foods = new Foods();
    this.pheromone = new Pheromone(this);
    this.ants = new Ants(this);
    this.canvas; 
    this.pheromone_food_canvas; 
    this.pheromone_hive_canvas; 
}

Antropy.prototype.init = function(canvasid, pheromone_food_canvasid, pheromone_hive_canvasid) {
    //Canvas stuff
    this.canvas = document.getElementById(canvasid);
    this.canvas_c = new CanvasData(this.canvas);

    this.pheromone_food_canvas = document.getElementById(pheromone_food_canvasid);
    this.pheromone_food_canvas_c = new CanvasData(this.pheromone_food_canvas);
    //alert("pheromone_canvasid:" + pheromone_canvasid +":");
    //this.pheromone_canvas = document.getElementById(pheromone_canvasid); // $(pheromone_canvasid)[0]; 
    //this.pheromone_ctx = pheromone_canvas.getContext("2d");
    this.pheromone_hive_canvas = document.getElementById(pheromone_hive_canvasid);
    this.pheromone_hive_canvas_c = new CanvasData(this.pheromone_hive_canvas);

    this.antSpace = new AntSpace(this.canvas.width,this.canvas.height);
    this.hive.draw(this.canvas_c.context);
    this.foods.draw(this.canvas_c.context);
    this.pheromone.draw(this.pheromone_food_canvas_c.context, this.pheromone_hive_canvas_c.context);
    this.ants.draw(this.canvas_c.context);
}

Antropy.prototype.step = function() {
    var start = +new Date(); // log start timestamp
    this.canvas_c.clear();
    this.pheromone_food_canvas_c.clear();
    this.pheromone_hive_canvas_c.clear();
    //this.pheromone_ctx.clearRect(0, 0, this.pheromone_canvas.width, this.pheromone_canvas.height);

    this.hive.draw(this.canvas_c.context);
    this.foods.draw(this.canvas_c.context);
    this.pheromone.step();
    this.pheromone.draw(this.pheromone_food_canvas_c.context,this.pheromone_hive_canvas_c.context);
    this.ants.step();
    this.ants.draw(this.canvas_c.context);
    
    this.canvas_c.draw();
    //this.pheromone_food_canvas_c.draw();
    this.pheromone_hive_canvas_c.draw();
    //this.pheromone_ctx.drawImage(pheromone_offCanvas,0,0);
    var end =  +new Date();  // log end timestamp
    var diff = end - start;
    document.getElementById("demo").innerHTML = "step cycle: " + diff;
}

