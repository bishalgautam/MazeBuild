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
@paramters : 
 @ can be changed to get desired result.
  cols : no of colums
  rows : no of rows
  width_cell : width and height of a square cell
  framerate : rate of rendering


******************************************************************************************
******************************************************************************************
*/


const cols = 10;
const rows = 10;
var width_cell = 20;
var grid = [];

var current;

var stack = []; // In this case we only need to push and remove using stack so an array is sufficient.


var creation = true;
var solve = false;
var solveInProgress = false;
var showPath = false; 

var route = []; // A stack for sloving the maze.

var currentPath;

// Intial setup, it runs once after the page loads. 
function setup() {
 createCanvas(cols*width_cell, cols*width_cell);
 

 for(var i=0; i < rows ; i++){
 	for(var j=0; j< cols; j++){
 		var cell = new Cell(j, i);
 		 grid.push(cell);
 	}
 }

 current = grid[0];

}


// it runs just after the setup function and will continues forever until stopped.
function draw() {
  
   frameRate(5); // It can be changes to get slower or faster rate of rendering. In my walk through video I am using 10. 

   background(51);

   for(var i=0; i < grid.length ; i++){
   	 	grid[i].put();
   }

/*******************************************************************************************
   Create the maze 
//******************************************************************************************/	
	
if(creation){
  // STEP 1
	  current.visited = true;
    current.highlight(0,0,255,100);
    	
    
    var next = current.findNeighbours();

    if(next){
    	
    	next.visited = true;

    	stack.push(current);

    	removeWalls(current, next);

    	current = next;
    	
    }else if(stack.length > 0){
    	current = stack.pop();
    }
 
   if( current.i  ===0 && current.j === 0){
  
      creation  = false;
      solve = true;
      //console.log("inside");
    
    }

    //console.log("loop");
  }
    

    
/*******************************************************************************************
   Solve the maze 
//******************************************************************************************/

 if(solve){

  var start = current;

  var end = grid[grid.length - 1];

  start.highlight(0,255,0,100);
  end.highlight(255,0,0,100);

  currentPath = grid[0];

  solve = false;
  solveInProgress = true;
}

if(solveInProgress){
  currentPath.path = true;

  var end = grid[grid.length - 1];

  currentPath.highlight(255,255,255,100);
  end.highlight(255,0,0,100);

  var nextRoute = currentPath.nextPath();
    
  if(nextRoute){
   
      nextRoute.path = true;

      route.push(currentPath);
  
      currentPath = nextRoute;

    if( currentPath.i  === end.i && currentPath.j === end.j ){
     
      currentPath.put();
      route.push(currentPath);
      currentPath.highlight(255,255,255,100);

      solve = false;
      solveInProgress = false;
      showPath = true;
      noLoop();
    }

    }else if(route.length > 0){
      currentPath = route.pop();
      
    }
  }


  if(showPath){

    while(route.length > 0){

      var pa = route.pop();
        noStroke();
        fill('rgba(0,255,0, 0.25)');
        rect(pa.i*width_cell, pa.j*width_cell, width_cell, width_cell);
    }

    infoText("Solution is along the green line starting top-left to bottom-right");
  }

  
 
}// draw() ends;


/* Other functions  
*/

function infoText(message) {
  document.getElementById('title').textContent = message;
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