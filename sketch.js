/*
******************************************************************************************
******************************************************************************************
Source : https://en.wikipedia.org/wiki/Maze_generation_algorithm
Maze Generation : 
	1. Make the initial cell the current cell and mark it as visited
		2.While there are unvisited cells
			If the current cell has any neighbours which have not been visited
				Choose randomly one of the unvisited neighbours
				Push the current cell to the stack
				Remove the wall between the current cell and the chosen cell
				Make the chosen cell the current cell and mark it as visited
			Else if stack is not empty
				Pop a cell from the stack
				Make it the current cell
******************************************************************************************
******************************************************************************************


******************************************************************************************
******************************************************************************************
*/


var cols, rows;
var width_cell = 20;
var grid = [];


var current;

var stack = []; // In this case we only need to push and remove using stack so an array is sufficient.

function setup() {
 createCanvas(100, 100);
 //background(153);
 cols =  floor(width/width_cell);
 rows = floor(height/width_cell);

 frameRate(1);

 for(var i=0; i < rows ; i++){
 	for(var j=0; j< cols; j++){
 		var cell = new Cell(j, i);
 		 grid.push(cell);
 	}
 }

 current = grid[0];

}



function draw() {
  //ellipse(50, 50, 80, 80);
    background(51);
   // //stroke(255);
   for(var i=0; i < grid.length ; i++){
   	 	grid[i].put();
   }
// STEP 1
    current.visited = true;
    current.highlight();

    var next = current.findNeighbours();
	console.log(next);

    if(next){
    	next.visited = true;

    	stack.push(current);

    	removeWalls(current, next);

    	current = next;
    }else if(stack.length > 0){
    	current = stack.pop();
    }

}

// function to get the cells in the 1D array using (row, colomn) indexes
function getIndex(i, j){
	if( i < 0 || j < 0 || i >=rows || j >= cols)
		return -1;
	return  i + j * cols;
}

//function to remove the wall between the cells in the path while making the maze

function removeWalls(current, next){
	var x = current.i - next.i;
 	if(x === 1){
 		current.walls[3] = false;
 		next.walls[1] = false;
 	}else if(x === -1){
 		current.walls[1] = false;
 		next.walls[3] = false;
 	}

 	var y = current.j - next.j;

 	if(y === 1){
 		current.walls[0] = false;
 		next.walls[2] = false;
 	}else if(y === -1){
 		current.walls[2] = false;
 		next.walls[0] = false;
 	}

}