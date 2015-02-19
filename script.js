
//load("jquery.min.js");
load("./util.js");
load("car.js");
load("street.js");
load("intersection.js");
load("controller.js");
load("gfx.js");
load("traffic.js");

function rng(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}




function Source(){
	
}






//$( document ).ready(function() {


	console.log("starting");

	var rows = 80;
	var columns = 80;

	//var canvas = document.getElementById('view');
	//var ctx = canvas.getContext('2d');

	//var w = canvas.width/rows;
	//var h = canvas.height/columns;

	var grid = new Traffic(rows, columns);
	//var GFX = new trafficGFX(w, h, grid, ctx);

	//ctx.fillStyle="white";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	grid.f1 = grid.leftUp 
	grid.f2 = grid.rightDown 

	//pre process
	var presteps = 100;
	for(var ii = 0; ii < 1000; ii++){
		grid.doMove();
		//GFX.draw();
	}
	/*for(var ii = 0; ii < 10; ii++){
		grid.doMove();
		GFX.draw();
	}*/
/*
	var image = canvas.toDataURL("image/test").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
	window.location.href=image; // it will save locally
	ctx.fillStyle="white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
*/	
	setInterval(function(){
		//ctx.fillStyle="white";
		//ctx.fillRect(0, 0, canvas.width, canvas.height);
		grid.doMove();
		console.log("Interval");
		//GFX.draw();
		}, 50);


		//console.log(grid.arr.getName());




	//ctx.fillRect(0, 0, w, h);






//});

