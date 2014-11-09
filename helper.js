"use strict";

// -----------------------------------------------------------------------------------------------------
// auxiliary functions

function Point (xx,yy) {
    this.x = xx;
    this.y = yy;
}

//
// quasi-normal distribution standard form: [-1,1) 
function gauss_random() {
    // http://stackoverflow.com/a/20161247/21047 and http://jsfiddle.net/Guffa/tvt5K/
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()-3)) / 3;
} 

//
// quasi-normal distribution in 2D 
// deviation is just an extension size scaling factor not a real deviation. 
function get2DGaussian(mean, deviation) {
    return new Point(gauss_random() * deviation + mean.x,gauss_random() * deviation + mean.y);
}

function sign(x) {
    // http://stackoverflow.com/q/7624920/21047
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

function create2DArray(rows,cols) {
  var arr = [];

    cols = cols || rows;
    for (var i=0;i<rows;i++) {
	arr[i] = new Array(cols);
    }

    return arr;
}

function copy2DArray(src, dest){
    var elem;
    for(elem in src){
	dest.push(src[elem].slice());
    }
}

function decimalToHexString(number) {
    // http://stackoverflow.com/a/697841/21047
    number = number || 0;
    if (number < 0) {
    	number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}