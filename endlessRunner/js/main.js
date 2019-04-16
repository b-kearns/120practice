//First CMPM 120 Phaser Exercise
"use strict";

//Create Game
var game = new Phaser.Game(800, 600, Phaser.CANVAS, "", {preload: preload, create: create, update: update});
var ctx = game.context;
var chinese;
var font_size = 10;
var columns;
var drops = [];
var graphics = new Phaser.Graphics(game, 0, 0);

function preload(){
	chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
	//chinese = "abcdefghijklmnopqrstuvwxyz"
	chinese = chinese.split("");
	
	columns = game.width / font_size;
	
	for(var i = 0; i < columns; i++){
		drops[i] = 1
	}
	
	// console.log(game.canvas);
	// console.log(game.context);
	// console.log(graphics);
}

function create(){
}

function update(){
	
	game.context.fillStyle = "rgba(0,0,0,0.05)";
	game.context.fillRect(0,0, game.width, game.height);
	
	// graphics.beginFill(0x000000);
	// graphics.drawRect(0, 0, game.width, game.height);
	// graphics.endFill();
	
	for(var i = 0; i < drops.length; i++){
		var text = chinese[Math.floor(Math.random()*chinese.length)];
		
		game.add.text(i*font_size, drops[i] * font_size, text, {fontSize: font_size, fill: "#0F0", font: "Arial"});
		
		if(drops[i]*font_size > game.height && Math.random() > 0.975){
			drops[i] = 0;
		}
		
		drops[i]++;
	}
}

// var c = document.getElementById("c");
// var ctx = c.getContext("2d");

// //making the canvas full screen
// c.height = window.innerHeight;
// c.width = window.innerWidth;

// //chinese characters - taken from the unicode charset
// var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
// //converting the string into an array of single characters
// chinese = chinese.split("");

// var font_size = 10;
// var columns = c.width/font_size; //number of columns for the rain
// //an array of drops - one per column
// var drops = [];
// //x below is the x coordinate
// //1 = y co-ordinate of the drop(same for every drop initially)
// for(var x = 0; x < columns; x++)
	// drops[x] = 1; 

// //drawing the characters
// function draw()
// {
	// //Black BG for the canvas
	// //translucent BG to show trail
	// ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	// ctx.fillRect(0, 0, c.width, c.height);
	
	// ctx.fillStyle = "#0F0"; //green text
	// ctx.font = font_size + "px arial";
	// //looping over drops
	// for(var i = 0; i < drops.length; i++)
	// {
		// //a random chinese character to print
		// var text = chinese[Math.floor(Math.random()*chinese.length)];
		// //x = i*font_size, y = value of drops[i]*font_size
		// ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		// //sending the drop back to the top randomly after it has crossed the screen
		// //adding a randomness to the reset to make the drops scattered on the Y axis
		// if(drops[i]*font_size > c.height && Math.random() > 0.975)
			// drops[i] = 0;
		
		// //incrementing Y coordinate
		// drops[i]++;
	// }
// }

// setInterval(draw, 33);



