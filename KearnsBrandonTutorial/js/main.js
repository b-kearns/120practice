//First CMPM 120 Phaser Exercise
"use strict";

//Create Game
var game = new Phaser.Game(600, 800, Phaser.AUTO, "", {preload: preload, create: create, update: update});

//Global Variables :(
var platforms;
var player;
var baddies;
var cursors;
var stars;
var score = 0;
var scoreText;
var random;
var diamonds;

function preload(){
	//Load Assets from assets/img
	game.load.image("sky", "assets/img/sky.png");
	game.load.image("ground", "assets/img/platform.png");
	game.load.image("star", "assets/img/star.png");
	game.load.image("diamond", "assets/img/diamond.png");
	game.load.spritesheet("dude", "assets/img/dude.png", 32, 48);
	game.load.spritesheet("baddie", "assets/img/baddie.png", 32, 32);
}

function create(){
	//Start Physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Draw Background
	game.add.sprite(0,0,"sky");
	
	//Create Platforms Group
	platforms = game.add.group();
	platforms.enableBody = true;
	
	//Create Ground
	var ground = platforms.create(0, game.world.height - 64, "ground");
	ground.scale.setTo(2,2);
	ground.body.immovable = true;
	
	//Build Ledges
	var ledge = platforms.create(400,575,"ground");
	ledge.body.immovable = true;
	
	ledge = platforms.create(-150,450,"ground");
	ledge.body.immovable = true;
	
	ledge = platforms.create(500,320,"ground");
	ledge.body.immovable = true;
	
	ledge = platforms.create(-225,280,"ground");
	ledge.body.immovable = true;
	
	// game.add.sprite(0,0,"star");
	//Create Player
	player = game.add.sprite(300, game.world.height - 150, "dude");
	
	//Define Player Physics
	game.physics.arcade.enable(player);
	
	player.body.bounce.y = 0.2
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;
	
	//Create Player Animations
	player.animations.add("left", [0,1,2,3], 10, true);
	player.animations.add("right", [5,6,7,8], 10, true);
	
	//Create Interface
	cursors = game.input.keyboard.createCursorKeys();
	
	//Create Stars
	stars = game.add.group();
	stars.enableBody = true;
	
	for (var i = 0; i < 12; i++) {
		var star = stars.create(i * 70, 0, "star");
		
		star.body.gravity.y = 100;
		
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
	
	//Create Scoreboard
	scoreText = game.add.text(16, 16, "score: 0", {fontSize: "32px", fill: "#000"});
	
	//Found at https://www.geeksforgeeks.org/javascript-math-random-function/
	random = Math.random() * (5 - 2) + 2;
	
	//Create Diamond
	diamonds = game.add.group();
	diamonds.enableBody = true;
	//var diamond = diamonds.create(random * 100, random * 100, "diamond");
	var diamond = diamonds.create(Math.random() * (600-0) + 0,Math.random() * (800-0) + 0, "diamond");
	
	while(game.physics.arcade.overlap(diamond, platforms)){
		diamond.kill();
		diamond = diamonds.create(Math.random() * (600-0) + 0,Math.random() * (800-0) + 0, "diamond");
		console.log("Recreated Diamond");
	}
	
	//Make Baddies a Group
	baddies = game.add.group();
	
	//Enable Baddie Physics
	baddies.enableBody = true;
	
	//Create Baddies
	for (var i = 1; i < 3; i++) {
		var baddie = baddies.create(i * 300 - i * 80, i * 200 + 100, "baddie");
		baddie.body.gravity.y = 300;
		baddie.body.bounce.y = 0.2;
		
	}
	
	//baddies.animations.add("left", [0, 1], 10, true);
	//baddies.animations.add("right", [2, 3], 10, true);
	
	//Create Baddie Animations
	baddies.callAll("animations.add", "animations", "left", [0, 1], 10, true);
	baddies.callAll("animations.add", "animations", "right", [2, 3], 10, true);
}

function update(){
	//Enable Ground Collision
	var hitPlatform = game.physics.arcade.collide(player,platforms);
	baddies.children[0].animations.play("left");
	baddies.children[1].animations.play("right");
	//baddies.callAll("animations.play", "animations", "left");
	
	//Enable Star Collision
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	
	//Enable Baddie Collison
	game.physics.arcade.collide(baddies, platforms);
	game.physics.arcade.overlap(player, baddies, removeBaddie, null, this);
	
	game.physics.arcade.overlap(player, diamonds, collectDi, null, this);
	
	//Avoid Acceleration
	player.body.velocity.x = 0;
	
	//Handles X-Axis Movement
	if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		player.animations.play("left");
	}
	else if (cursors.right.isDown) {
		player.body.velocity.x = 150
		player.animations.play("right");
	}
	else {
		player.animations.stop();
		player.frame = 4;
	}
	
	//Handles Jumping
	if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
		player.body.velocity.y = -350
	}
	
//This function handles collecting stars
function collectStar(player, star){
	star.kill();
	
	score += 10;
	scoreText.text = "Score: " + score;
}

function collectDi(player, diamond){
	diamond.kill();
	
	score += 50;
	scoreText.text = "Score: " + score;
}

//This function handles collisions with baddies
function removeBaddie(player, baddie){
	baddie.kill();
	
	score -= 25;
	scoreText.text = "Score: " + score;
}
	
}