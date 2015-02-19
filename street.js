
function TwoWayStreet(){

	this.capacity = 20;

	//two lanes, positive and negative
	this.pStreet = new Street(this.capacity);
	this.nStreet = new Street(this.capacity);
	
	//move the lanes in their preferred direction, ignoring car preferences
	this.flowTraffic = function(){
		this.pStreet.movePositive();
		this.nStreet.moveNegative();
	}

}


function Street(cap){
	this.capacity = cap;
	this.holder = new Array(this.capacity);
	this.direction = false;	//true means traffic moves in the positive direction
				//depending on that which manages movement, this variable could be ignored

	for(var ii = 0; ii < this.capacity; ii++){
		if(rng(0, 5) == 0){
			this.holder[ii] = (new Car());
		}else{
			this.holder[ii] = null;
		}
		//console.log(this.holder[ii]);
	}


	this.positiveOccupied = function(){
		return (this.holder[this.capacity-1] != null);
	}

	this.negativeOccupied = function(){
		return (this.holder[0] != null);

	}


	//attempt to push onto the positive end, return true if success
	this.pushOnRight = function(car){
		if(!this.positiveOccupied()){
			this.holder[this.capacity-1] = car;
			return true;
		}else{
			return false;
		}
	}

	//attempt to push onto the negative end, return true if success
	this.pushOnLeft = function(car){
		if(!this.negativeOccupied()){
			this.holder[0] = car;
			return true;
		}else{
			return false;
		}
	}




	//if the rightmost one desires to leave the street, delete it from the street and return it's value
	this.popRightmost = function(){
		var retval = null;
		var rightmost = this.holder[this.capacity-1];	//the one on the right end
		if(rightmost instanceof Car){	//this is a car
			//if(rightmost.direction == true){	//it is moving positively (out of the street)
				retval = rightmost;		//set up to return it
				this.holder[this.capacity-1] = null;	//delete it so we can fill the rest
			//}
		}
		return retval;
	}
	//if the leftmost one desires to leave the street, delete it from the street and return it's value
	this.popLeftmost = function(){
		var retval = null;
		var leftmost = this.holder[0];	//the one on the left end
		if(leftmost instanceof Car){	//this is a car
			//if(leftmost.direction == false){	//it is moving negatively (out of the street)
				retval = leftmost;		//set up to return it
				this.holder[0] = null;	//delete it so we can fill the rest
			//}
		}
		return retval;
	}

	/*
		Iterate thru, moving cars that want to move positively in the positive direction
		will not overwrite a car
		will not move the rightmost car out, for that, see poprightmost
	*/
	this.movePositiveByPreference = function(){
		var b1,b2,b3;
		for(var ii = this.capacity-1; ii > 0; ii--){
			if(this.holder[ii-1] instanceof Car){
				if(this.holder[ii-1].direction){
					if(this.holder[ii] == null){
						this.holder[ii] = this.holder[ii-1];
						this.holder[ii-1] = null;
					}
				}
			}
		}
	}
	/*
		Iterate thru, moving cars that want to move negatively in the negative direction
		will not overwrite a car
		will not move the leftmost car out, for that, see popleftmost
	*/
	this.moveNegativeByPreference = function(){
		for(var ii = 0; ii < this.capacity-1; ii++){
			if(this.holder[ii+1] instanceof Car){
				if(!this.holder[ii+1].direction){
					if(this.holder[ii] == null){
						this.holder[ii] = this.holder[ii+1];
						this.holder[ii+1] = null;
					}
				}
			}
		}
	}	

	//move everything in one direction -- this is a one way street
	this.movePositive = function(){
		//go down the list and move em all
		for(var ii = this.capacity-1; ii > 0; ii--){
			if(this.holder[ii] == null){
				this.holder[ii] = this.holder[ii-1]; //move the one to the left of it into it
				this.holder[ii-1] = null;
			}
		}
	}

	//move everything in one direction -- this is a one way street
	this.moveNegative = function(){
		for(var ii = 0; ii < this.capacity-1; ii++){
			if(this.holder[ii] == null){
				this.holder [ii] = this.holder[ii+1]; //move the one to the right to here
				this.holder[ii+1] = null;
			}
		}
	}


}
