

/*  author : Bishal Gautam 
	title : cell object;

*/


function Cell(i,j){
	
	this.i = i;
	this.j = j;

	this.walls = [true, true, true, true]; // four walls [TOP, RIGHT, BOTTOM , LEFT]
	this.visited = false;	// intially set to not visited

	this.findNeighbours = function(){
		var neighbors = [] ;

		var top = grid[getIndex(i-1, j)];
		var right = grid[getIndex(i, j+1)];
		var bottom = grid[getIndex(i+1, j)];
		var left = grid[getIndex(i, j-1)];

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
	}

	this.highlight = function() {
    var x = this.i*width_cell;
    var y = this.j*width_cell;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, width_cell, width_cell);

  }



}
