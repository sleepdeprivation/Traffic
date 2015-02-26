

function Traffic(sizeX, sizeY){

	this.grid = new XYArray(sizeX, sizeY);

	//if we can plug the rightmost edge into the left side
	this.wrapX = (sizeX%3 == 0) ? true : false;
	this.wrapY = (sizeY%3 == 0) ? true : false;


	//when cars go off the edge they're going to go back around to the other side
	if(this.wrapX && this.wrapY){
		this.grid.get = this.grid.getCircular;
	}

	//load the grid with streets, intersections, and sources
	for (var i=0;i<sizeX;i++) {
		this.grid.arr[i] = [];
		for(var k = 0; k < sizeY; k++){
			if(i%2 == 0){
				if(k%2 == 0){
					this.grid.arr[i].push(new Intersection);
				}else{
					this.grid.arr[i].push(new TwoWayStreet);
				}
			}else{
				if(k%2 == 0){
					this.grid.arr[i].push(new TwoWayStreet);
				}else{
					this.grid.arr[i].push(new Source);
				}
			}
		}
  	}

	/*
		First we process all the streets,
		Then we perform intersection traffic
		This allows us to move cars that just entered a street out of the way if we can
		before moving another car in.
	*/
	this.doMove = function(){
		var thing;


		for(var ii = 0; ii < this.grid.dimX; ii++){
		for(var kk = 0; kk < this.grid.dimY; kk++){
			thing = this.grid.arr[ii][kk];
			if(thing instanceof TwoWayStreet){
				//console.log("processing street");
				thing.flowTraffic();
			}
		}}

		for(var ii = 0; ii < this.grid.dimX; ii++){
		for(var kk = 0; kk < this.grid.dimY; kk++){
			thing = this.grid.arr[ii][kk];
			if(thing instanceof Source){
			}
			else if(thing instanceof Intersection){
				//console.log("processing intersection");
				this.intersectionMove(ii, kk, thing);
			}
		}}
		
	}
	
/*
	Transfer functions
	
	The below functions transfer cars in specific ways from street to street.
	Remember - a street is just an array with functions for moving objects in them
	
	These operations are safe (no cars will be harmed...)
	
*/

	/*
		Move from the positive end of street A to the negative end of street B
		ie from street A onto street B
		Do not overwrite
		A -> B
	*/
	this.PNTransfer = function(streetA, streetB){
		var temp;
		var aye,bee;
		if(streetA != null && streetB != null){
			aye = streetA.pStreet;
			bee = streetB.pStreet;
			temp = aye.popRightmost(); //get the rightmost member of street a
			if(!bee.pushOnLeft(temp)){ //if we failed to drop it into street B
				aye.pushOnRight(temp); //put it right back
			}
		}
	}

	/*
		Move from the negative end of street B to the positive end of street A
		ie from street B onto street A
		Do not overwrite
		A <- B
	*/
	this.NPTransfer = function(streetA, streetB){
		var temp;
		var aye,bee;
		if(streetA != null && streetB != null){
			aye = streetA.nStreet;
			bee = streetB.nStreet;
			temp = bee.popLeftmost(); //get the rightmost member of street a
			if(!aye.pushOnRight(temp)){ //if we failed to drop it into street B
				bee.pushOnLeft(temp); //put it right back
			}
		}
	}

	/*
		Take from the positive lane of streetA and move onto the negative lane of street b

		The function gets its name because it is a transfer from the positive (rightmost) end of A
		to the positive (rightmost) end of B

		ex
		BEFORE:
		A.p = [00001]
		B.n = [00000]
		AFTER:
		A.p = [00000]
		B.n = [00001]
		Imagine B is the north street, and A is the west

		This is a transfer from A to B
	*/
	this.P2Transfer = function(streetA, streetB){
		var temp;
		var aye,bee;
		if(streetA != null && streetB != null){
			aye = streetA.pStreet;
			bee = streetB.nStreet;
			temp = aye.popRightmost(); //get the rightmost member of street a
			if(!bee.pushOnRight(temp)){ //if we failed to drop it into street B
				aye.pushOnRight(temp); //put it right back
			}
		}
	}
	/*
		Take from the negative lane of streetA and move onto the positive lane of street b

		The function gets its name because it is a transfer from the negative (leftmost) end of A
		to the negative (leftmost) end of B

		ex
		BEFORE:
		A.p = [10000]
		B.n = [00000]
		AFTER:
		A.p = [00000]
		B.n = [10000]
		Imagine A is the south street, and B is the east

		This is a transfer from A to B
	*/
	this.N2Transfer = function(streetA, streetB){
		var temp;
		var aye,bee;
		if(streetA != null && streetB != null){
			aye = streetA.nStreet;
			bee = streetB.pStreet;
			temp = aye.popLeftmost(); //get the rightmost member of street a
			if(!bee.pushOnLeft(temp)){ //if we failed to drop it into street B
				aye.pushOnLeft(temp); //put it right back
			}
		}
	}
	
/*
	For the given intersection, choose a car to turn at random and have it turn in a random
	direction.
	The below functions were written to replace the large function calls to the above
*/
	this.randomTurns = function(x, y, intersection){



		switch(rng(0, 8)){
			case 0:	//left up
				this.P2Transfer(this.grid.get(x-1, y), this.grid.get(x, y-1));
				break;
			case 1:	//up left
				this.P2Transfer(this.grid.get(x, y-1), this.grid.get(x-1, y));
				break;
			case 2:	//down right
				this.N2Transfer(this.grid.get(x, y+1), this.grid.get(x+1, y));
				break;
			case 3:	//right down
				this.N2Transfer(this.grid.get(x+1, y), this.grid.get(x, y+1));
				break;


			case 4:	//up right
				this.PNTransfer(this.grid.get(x, y-1), this.grid.get(x+1, y));
				break;
			case 5:	//right up
				this.NPTransfer(this.grid.get(x,y-1),this.grid.get(x+1,y));
				break;
			case 6:	//left down
				this.PNTransfer(this.grid.get(x-1, y), this.grid.get(x, y+1));
				break;
			case 7:	//down left
				this.NPTransfer(this.grid.get(x-1, y), this.grid.get(x, y+1));
				break;
				

		}


	}

	/*
	These 8 functions let you move cars from one side of the intersection to one of the remaining 3 sides.
	The first word is where the car comes from, the second word is where they are going.
	These operations are safe (they won't delete cars)
	
		Example:
		"left up"-
		Move cars from the LEFT side of the intersection to the UP (above) side
		
	
	*/
	this.leftUp = function(x, y, intersection){
		this.P2Transfer(this.grid.get(x-1, y), this.grid.get(x, y-1));
	}
	this.rightDown = function(x, y, intersection){
		this.N2Transfer(this.grid.get(x+1, y), this.grid.get(x, y+1));
	}
	this.upRight = function(x, y, intersection){
		this.PNTransfer(this.grid.get(x, y-1), this.grid.get(x+1, y));
	}
	this.downLeft = function(x, y, intersection){
		this.NPTransfer(this.grid.get(x-1, y), this.grid.get(x, y+1));
	}
	this.upLeft = function(x, y, intersection){
		this.P2Transfer(this.grid.get(x, y-1), this.grid.get(x-1, y));
	}
	this.downRight = function(x, y, intersection){
		this.N2Transfer(this.grid.get(x, y+1), this.grid.get(x+1, y));
	}
	this.rightUp = function(x, y, intersection){
		this.NPTransfer(this.grid.get(x,y-1),this.grid.get(x+1,y));
	}
	this.leftDown = function(x, y, intersection){
		this.PNTransfer(this.grid.get(x-1, y), this.grid.get(x, y+1));
	}



/*
	These functions perform specific sets of moves on an intersection
	Try using them for every intersection to see what happens...
*/
	this.counterClockWise = function(x, y, intersection){
		//left up
		this.P2Transfer(this.grid.get(x-1, y), this.grid.get(x, y-1));
		//right down
		this.N2Transfer(this.grid.get(x+1, y), this.grid.get(x, y+1));
		//up right
		this.PNTransfer(this.grid.get(x, y-1), this.grid.get(x+1, y));
		//down left
		this.NPTransfer(this.grid.get(x-1, y), this.grid.get(x, y+1));

	}
	this.clockWise = function(x, y, intersection){
		//up left
		this.P2Transfer(this.grid.get(x, y-1), this.grid.get(x-1, y));
		//down right
		this.N2Transfer(this.grid.get(x, y+1), this.grid.get(x+1, y));
		//right up
		this.NPTransfer(this.grid.get(x,y-1),this.grid.get(x+1,y));
		//left down
		this.PNTransfer(this.grid.get(x-1, y), this.grid.get(x, y+1));
	}


/*
	Perform a specific move at the intersection.
	At the moment, you'll need to just uncomment the one you want on
	Later, I'll add some buttons or something out in the index.html
*/
	this.intersectionMove = function(x, y, intersection){

		if(this.grid.boundsCheck(x, y)){
			//var aboveEx = this.grid.boundsCheck(x, y-1);
			//var belowEx = this.grid.boundsCheck(x, y+1);

			//var leftEx = this.grid.boundsCheck(x-1, y);
			//var rightEx = this.grid.boundsCheck(x+1, y);
		
			//remove this later
			if(rng(0, 2) == 0){
				this.randomTurns(x, y, intersection);
				//this.clockWise(x, y, intersection);
				//this.f1(x, y, intersection); this.f2(x, y, intersection);
				intersection.vertical = !intersection.vertical; //change from North South to East West and back
			}else{
				if(intersection.vertical){
					this.PNTransfer(this.grid.get(x, y-1), this.grid.get(x, y+1));//move things down from above
					this.NPTransfer(this.grid.get(x, y-1), this.grid.get(x, y+1));//move things up from below
				}else if(!intersection.vertical){
					this.PNTransfer(this.grid.get(x-1, y), this.grid.get(x+1, y));//move things right from left
					this.NPTransfer(this.grid.get(x-1, y), this.grid.get(x+1, y));//move things left from right
				}
			}
		}
	}


	this.streetMove = function(x, y){
		
	}

}
