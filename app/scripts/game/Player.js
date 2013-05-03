//--------------------------------------------------------------------------
//  Player Class
//--------------------------------------------------------------------------
GAME.Player = function(engineRef){
	console.log("Player");

	this.engine = engineRef;

	this.position = new PIXI.Point;

	// player state
	this.onGround = 1;
	this.isJumping = 0;
	this.wasJumping = 0;
	this.isFalling = 0;
	this.fallCounter = 0;

	// defaults
	this.position.y = 329;
    this.position.x = 0;
    this.currentAnimSpeed = 0.3;

    this.gravity = 0.4;
    this.acceleration = 0.05;
    this.baseSpeed = 4;
    this.maxSpeed = 12;
    this.speed = new PIXI.Point(this.baseSpeed, 0);

    this.width = 220;
    this.height = 90;

	// animation frames with ranger
	this.runningFrames = [
		PIXI.Texture.fromFrame("silver_run_final.swf/0000"),PIXI.Texture.fromFrame("silver_run_final.swf/0001"),PIXI.Texture.fromFrame("silver_run_final.swf/0002"),PIXI.Texture.fromFrame("silver_run_final.swf/0003"),PIXI.Texture.fromFrame("silver_run_final.swf/0004"),PIXI.Texture.fromFrame("silver_run_final.swf/0005"),PIXI.Texture.fromFrame("silver_run_final.swf/0006"),PIXI.Texture.fromFrame("silver_run_final.swf/0007")
	];
	this.jumpingFrames = [
		PIXI.Texture.fromFrame("silver_jump_final.swf/0000"),PIXI.Texture.fromFrame("silver_jump_final.swf/0001"),PIXI.Texture.fromFrame("silver_jump_final.swf/0002"),PIXI.Texture.fromFrame("silver_jump_final.swf/0003"),PIXI.Texture.fromFrame("silver_jump_final.swf/0004"),PIXI.Texture.fromFrame("silver_jump_final.swf/0005"),PIXI.Texture.fromFrame("silver_jump_final.swf/0006"),PIXI.Texture.fromFrame("silver_jump_final.swf/0007"),PIXI.Texture.fromFrame("silver_jump_final.swf/0008"),PIXI.Texture.fromFrame("silver_jump_final.swf/0009"),PIXI.Texture.fromFrame("silver_jump_final.swf/0010"),PIXI.Texture.fromFrame("silver_jump_final.swf/0011"),PIXI.Texture.fromFrame("silver_jump_final.swf/0012"),PIXI.Texture.fromFrame("silver_jump_final.swf/0013"),PIXI.Texture.fromFrame("silver_jump_final.swf/0014"),PIXI.Texture.fromFrame("silver_jump_final.swf/0015"),PIXI.Texture.fromFrame("silver_jump_final.swf/0016"),PIXI.Texture.fromFrame("silver_jump_final.swf/0017"),PIXI.Texture.fromFrame("silver_jump_final.swf/0018"),PIXI.Texture.fromFrame("silver_jump_final.swf/0019"),PIXI.Texture.fromFrame("silver_jump_final.swf/0020")
	];
	this.fallingFrames = [
		PIXI.Texture.fromFrame("silver_fall_final.swf/0000"),PIXI.Texture.fromFrame("silver_fall_final.swf/0001"),PIXI.Texture.fromFrame("silver_fall_final.swf/0002"),PIXI.Texture.fromFrame("silver_fall_final.swf/0003"),PIXI.Texture.fromFrame("silver_fall_final.swf/0004"),PIXI.Texture.fromFrame("silver_fall_final.swf/0005")
	];

	// animation frames solo
	this.runningFrames = [
		PIXI.Texture.fromFrame("silver_run_final_solo.swf/0000"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0001"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0002"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0003"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0004"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0005"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0006"),PIXI.Texture.fromFrame("silver_run_final_solo.swf/0007")
	];
	this.jumpingFrames = [
		PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0000"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0001"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0002"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0003"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0004"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0005"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0006"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0007"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0008"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0009"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0010"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0011"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0012"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0013"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0014"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0015"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0016"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0017"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0018"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0019"),PIXI.Texture.fromFrame("silver_jump_final_solo.swf/0020")
	];
	this.fallingFrames = [
		PIXI.Texture.fromFrame("silver_fall_final_solo.swf/0000"),PIXI.Texture.fromFrame("silver_fall_final_solo.swf/0001"),PIXI.Texture.fromFrame("silver_fall_final_solo.swf/0002"),PIXI.Texture.fromFrame("silver_fall_final_solo.swf/0003"),PIXI.Texture.fromFrame("silver_fall_final_solo.swf/0004"),PIXI.Texture.fromFrame("silver_fall_final_solo.swf/0005")
	];
    
	this.view = new PIXI.MovieClip(this.runningFrames);
	this.view.anchor.x = 0.5;
    this.view.anchor.y = 1;

	this.view.animationSpeed = this.currentAnimSpeed;

    this.view.position.x = this.position.x;
    this.view.position.y = this.position.y;

}

GAME.Player.constructor = GAME.Player;

GAME.Player.prototype.jump = function() {

	if (this.onGround && !GAME.gameover){

		this.isJumping = 1;
		this.wasJumping = 1;
		this.onGround = 0;

		this.onGround = 0;
		this.speed.y = -9.3;

		this.view.stop();
		this.view.currentFrame = 0;
		this.view.textures = this.jumpingFrames;
		this.view.animationSpeed = 0.5;
		this.view.loop = false;
		this.view.play();

	}

};

GAME.Player.prototype.jumpComplete = function() {

	this.view.stop();
	this.view.currentFrame = 14;
	this.view.textures = this.runningFrames;
	this.view.animationSpeed = this.currentAnimSpeed;
	this.view.loop = true;
	this.view.play();
	this.onGround = 1;
	this.wasJumping = 0;
	this.isFalling = 0;
	this.fallCounter = 0;
	//GAME.camera.y = this.position.y - 329;
}

GAME.Player.prototype.fall = function() {

		this.view.animationSpeed = 0.1;

};


GAME.Player.prototype.hitObstacle = function() {

	this.speed.x = this.baseSpeed;
	TweenMax.to(this.view, 0.05, {alpha:0.3, yoyo:true, repeat:5, overwrite:"all", startAt:{alpha:1}});

}


GAME.Player.prototype.update = function() {

	this.speed.y += this.gravity;

	if (this.speed.y > 0 && this.isJumping){
		this.isJumping = 0;
	}

	if (this.onGround){
		if (this.speed.x < this.maxSpeed){
			this.speed.x += this.acceleration;
		}
	} else if (!this.wasJumping && !this.isFalling){
		// falling
		this.isFalling = 1;
		this.fall();
	}

	if (this.isFalling){
		this.fallCounter += this.speed.y;
	}

	if (this.position.y - this.height - 40 > GAME.height){
		// game over
		this.engine.onGameOver();
	}

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    GAME.camera.x = this.position.x - 140;

    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;
}

GAME.Player.prototype.reset = function(){

	this.onGround = 1;
	this.isJumping = 0;
	this.wasJumping = 0;
	this.isFalling = 0;
	this.fallCounter = 0;

	this.position.x = 0;
	this.position.y = 329;
    this.speed.y = 0;
    this.speed.x = this.baseSpeed;
    this.view.textures = this.runningFrames;
    this.view.loop = true;

	this.view.animationSpeed = this.currentAnimSpeed;
    this.view.play();

    GAME.camera.x = this.position.x - 140;

    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;

}
