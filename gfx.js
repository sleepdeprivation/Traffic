	

function trafficGFX(width, height, traffic, context){

	this.w = width;
	this.h = height;

	this.grid = traffic;

	this.streetW = 15;

	this.ctx = context;


	this.counter = 0;


	this.drawIntersection = function(ii, kk, pick){
		this.ctx.fillStyle = "blue";  this.ctx.fillRect(ii*this.w, kk*this.h, this.streetW, this.streetW);
	}
	this.drawStreet = function(ii, kk, pick){
		//things that are the same for all streets
		mod2 = ii % 2 == 0; //true for vertical streets
		//street dimensions always same
		dW = (mod2) ? (this.streetW)/2 : (2*this.w) - this.streetW;
		dH = (mod2) ? (2*this.h) - this.streetW : (this.streetW)/2;
		//car dimensions always same
		carW = (mod2) ? (this.streetW)/2 : dW/pick.capacity;
		carH = (mod2) ? dH/pick.capacity : (this.streetW)/2;


		//drawing positive street first
		sX = (mod2) ? (ii)*this.w: (ii-1)*this.w + this.streetW;
		sY = (mod2) ? (kk-1)*this.h + this.streetW: (kk*this.h) + this.streetW/2;
		//this.ctx.fillRect(sX, sY, dW, dH);
//		this.ctx.fillStyle = "gray";
//		this.ctx.fillRect(sX, sY, dW, dH);
//		this.ctx.strokeRect(sX, sY, dW, dH);
		//draw positive cars
		for(var ll = 0; ll < pick.pStreet.capacity; ll++){
			//console.log(pick.pStreet.capacity);
			if(pick.pStreet.holder[ll] != null){
				sA = (mod2) ? sX : sX +ll*carW;
				sB = (mod2) ? sY + ll*carH : sY;
//				context.fillStyle = "rgba(0, 0, 0, 0.01)";
//				context.fillRect(sA, sB, carW, carH);
				this.ctx.fillStyle = pick.pStreet.holder[ll].color;
				this.ctx.fillRect(sA, sB, carW, carH);
				this.ctx.strokeRect(sA,sB,carW,carH);
			}
		}
		//nao draw negative street
		sX = (mod2) ? (ii)*this.w + this.streetW/2 : (ii-1)*this.w +this.streetW;
		sY = (mod2) ? (kk-1)*this.h+this.streetW : (kk*this.h);
//		this.ctx.fillStyle = "red";
//		this.ctx.fillRect(sX, sY, dW, dH);
//		this.ctx.fillStyle = "black";
//		this.ctx.strokeRect(sX, sY, dW, dH);
		//draw negative cars
		for(var ll = 0; ll < pick.nStreet.capacity; ll++){
			if(pick.nStreet.holder[ll] != null){
				sA = (mod2) ? sX : sX +ll*carW;
				sB = (mod2) ? sY + ll*carH : sY;
//				context.fillStyle = "rgba(0, 0, 0, 0.01)";
//				context.fillRect(sA, sB, carW, carH);
				this.ctx.fillStyle = pick.nStreet.holder[ll].color;
				this.ctx.fillRect(sA, sB, carW, carH);
				this.ctx.strokeRect(sA,sB,carW,carH);
			}
		}
		



	}
	this.drawSource = function(ii, kk, pick){
		this.ctx.fillStyle = "green"; this.ctx.fillRect(ii*this.w, kk*this.h, this.streetW, this.streetW);
	}



	this.draw = function(){

		this.counter++;

		var pick;
		var sX, sY, dW, dH;
		var carW, carH;
		var mod2;
		var sA, sB;

		this.ctx.font="20px Times";
		this.ctx.fillText( this.counter.toString(), 50, 50);
		this.ctx.fillStyle = "red";


		for(var ii = 0; ii < this.grid.grid.dimX; ii++){
		for(var kk = 0; kk < this.grid.grid.dimY; kk++){
			pick = this.grid.grid.get(ii, kk);
			if(pick instanceof Intersection){this.drawIntersection(ii,kk,pick);}
			if(pick instanceof TwoWayStreet	){this.drawStreet(ii,kk,pick);}
			if(pick instanceof Source	){this.drawSource(ii,kk, pick);}

		}}
	}

}
