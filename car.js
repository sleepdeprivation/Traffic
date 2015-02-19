

function Car(){
	this.direction = false; //true is positive
				//depending on that which manages movement, this variable could be ignored


	var rnd = rng(0, 6);

	this.color = "blue";

	switch(rnd){
		case 0:
			this.color = "yellow";
			break;
		case 1:
			this.color = "orange";
			break;
		case 2:
			this.color = "purple";
			break;
		case 3:
			this.color = "green";
			break;
		case 4:
			this.color = "teal";
			break;

	}
	//blinkers	
	this.rightTurn = false;
	this.leftTurn = false;

	this.resetBlinkers = function(){
		this.rightTurn = false;
		this.leftTurn = false;
	}
}

