

/*  author : Bishal Gautam 
	title : cell object;

*/


function Cell(i,j){
	
	this.i = i; //column 
	this.j = j; // row 

	this.walls = [true, true, true, true]; // four walls [TOP, RIGHT, BOTTOM , LEFT].
	this.visited = false;	// intially set to not visited.
	this.path = false; // variable to track the path ; initially does not lie in our path.


    // getnextPath while solving the problem.
    /*
	 * returns a possible next path when solving the maze.
    */
	this.nextPath = function(){
		var paths = [];

		var top = grid[getIndex(i, j-1)];
		var right = grid[getIndex(i+1, j)];
		var bottom = grid[getIndex(i, j+1)];
		var left = grid[getIndex(i-1, j)];


		if(top && top.visited && !top.path){
			if(!top.walls[2] && !this.walls[0]){
				paths.push(top);
			}
		}
		if(right && right.visited && !right.path){
			if(!right.walls[3] && !this.walls[1]){
				paths.push(right);
			}
		}
		if(bottom && bottom.visited && !bottom.path){
			if(!bottom.walls[0] && !this.walls[2]){
				paths.push(bottom);
			}
		}
		if(left && left.visited && !left.path){
			if(!left.walls[1] && !this.walls[3]){
				paths.push(left);
			}
		}

		if(paths.length > 0){
			var r = floor(random(0, paths.length));
			return paths[r];
		}else{
			return undefined;
		}

	}

	/* 
	 *  returns the unvisited neighbour when creating the maze.
	*/
	this.findNeighbours = function(){
		var neighbors = [] ;

		var top = grid[getIndex(i, j-1)];
		var right = grid[getIndex(i+1, j)];
		var bottom = grid[getIndex(i, j+1)];
		var left = grid[getIndex(i-1, j)];

		if (top && !top.visited) {
	      neighbors.push(top);
	    }
	    if (right && !right.visited) {
	      neighbors.push(right);
	    }
	    if (bottom && !bottom.visited) {
	      neighbors.push(bottom);
	    }
	    if (left && !left.visited) {
	      neighbors.push(left);
	    }
	    //console.log(neighbors);

	    if (neighbors.length > 0) {
	      var r = floor(random(0, neighbors.length));
	      return neighbors[r];
	    } else {
	      return undefined;
	    }

	}

	this.put = function(){
		//console.log("putting");
		var x =  this.i*width_cell;
		var y =  this.j*width_cell;

		//strokeWeight(4);
		stroke(255);

		if(this.walls[0]){
			line(x, y, x+width_cell, y); // top wall of the square cell
		}
			
		if(this.walls[1]){
			line(x+width_cell, y, x+width_cell, y+width_cell ); // right wall of the square cell
		}
			
		if(this.walls[2]){
			line(x+width_cell, y+width_cell, x, y+width_cell); // bottom wall of the square cell
		}
			
		if(this.walls[3]){
			line(x, y, x, y+width_cell); // left wall of the square
		}
			
		// walls being created 
		if (this.visited) {
		      noStroke();
		      fill(255, 0, 255, 100);
		      rect(x, y, width_cell, width_cell);
    	}
    	// if path exists; only runs when we solve the maze;
    	if(this.path) {
    		noStroke();
    		fill(255,255,0, 100);
    		rect(x, y, width_cell, width_cell);
    	}
	}

	this.highlight = function(red, green, blue, hue) {
    var x = this.i*width_cell;
    var y = this.j*width_cell;
    noStroke();
    fill(red, green, blue, hue);
    rect(x, y, width_cell, width_cell);

  }



}
