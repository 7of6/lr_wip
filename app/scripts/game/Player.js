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
	this.dead = 0;
	this.cutScene = 0;

	// defaults
	this.position.y = 345;
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
	this.rangerRunning = [
		PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0000"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0001"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0002"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0003"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0004"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0005"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0006"),PIXI.Texture.fromFrame("silver_run_final_75_percent.swf/0007")
	];
	this.rangerJumping = [
		PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0000"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0001"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0002"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0003"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0004"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0005"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0006"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0007"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0008"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0009"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0010"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0011"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0012"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0013"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0014"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0015"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0016"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0017"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0018"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0019"),PIXI.Texture.fromFrame("silver_jump_final_75percent.swf/0020")
	];
	this.rangerFalling = [
		PIXI.Texture.fromFrame("silver_fall_final_75percent.swf/0000"),PIXI.Texture.fromFrame("silver_fall_final_75percent.swf/0001"),PIXI.Texture.fromFrame("silver_fall_final_75percent.swf/0002"),PIXI.Texture.fromFrame("silver_fall_final_75percent.swf/0003"),PIXI.Texture.fromFrame("silver_fall_final_75percent.swf/0004"),PIXI.Texture.fromFrame("silver_fall_final_75percent.swf/0005")
	];

	// animation frames solo
	this.soloRunning = [
		PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0000"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0001"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0002"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0003"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0004"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0005"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0006"),PIXI.Texture.fromFrame("silver_run_final_solo_75percent.swf/0007")
	];
	this.soloJumping = [
		PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0000"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0001"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0002"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0003"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0004"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0005"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0006"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0007"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0008"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0009"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0010"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0011"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0012"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0013"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0014"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0015"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0016"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0017"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0018"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0019"),PIXI.Texture.fromFrame("silver_jump_final_solo_75percent.swf/0020")
	];
	this.soloFalling = [
		PIXI.Texture.fromFrame("silver_fall_final_solo_75percent.swf/0000"),PIXI.Texture.fromFrame("silver_fall_final_solo_75percent.swf/0001"),PIXI.Texture.fromFrame("silver_fall_final_solo_75percent.swf/0002"),PIXI.Texture.fromFrame("silver_fall_final_solo_75percent.swf/0003"),PIXI.Texture.fromFrame("silver_fall_final_solo_75percent.swf/0004"),PIXI.Texture.fromFrame("silver_fall_final_solo_75percent.swf/0005")
	];

	this.runningFrames = this.soloRunning;
	this.jumpingFrames = this.soloJumping;
	this.fallingFrames = this.soloFalling;
    
	this.view = new PIXI.MovieClip(this.runningFrames);
	this.view.anchor.x = 0.5;
    this.view.anchor.y = 1;

	this.view.animationSpeed = this.currentAnimSpeed;

    this.view.position.x = this.position.x;
    this.view.position.y = this.position.y;

}

GAME.Player.constructor = GAME.Player;

GAME.Player.prototype.jump = function() {

	if (this.onGround && !GAME.gameover && !this.cutScene){

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

}

GAME.Player.prototype.fall = function() {

		this.view.animationSpeed = 0.1;

};


GAME.Player.prototype.hitObstacle = function() {

	this.speed.x = this.baseSpeed;
	TweenMax.to(this.view, 0.05, {alpha:0.3, yoyo:true, repeat:5, overwrite:"all", startAt:{alpha:1}});

}

GAME.Player.prototype.hitWall = function() {

	var self = this;

	this.dead = 1;
	this.speed.x = this.baseSpeed;
	this.onGround = 0;
	this.wasJumping = 0;
	this.isFalling = 0;

	this.view.stop();
	this.view.currentFrame = 0;
	this.view.textures = this.fallingFrames;
	this.view.animationSpeed = 0.4;
	this.view.loop = false;
	this.view.onComplete = function(){
		console.log("done");
		self.view.onComplete = null;
		self.engine.onGameOver();
	}
	this.view.play();

}

GAME.Player.prototype.pickupRanger = function() {

	this.view.stop();
	this.runningFrames = this.rangerRunning;
	this.jumpingFrames = this.rangerJumping;
	this.fallingFrames = this.rangerFalling;
	this.view.textures = this.runningFrames;
	this.view.play();
}

GAME.Player.prototype.dropOffRanger = function() {

	this.view.stop();
	this.runningFrames = this.soloRunning;
	this.jumpingFrames = this.soloJumping;
	this.fallingFrames = this.soloFalling;
	this.view.textures = this.runningFrames;
	this.view.play();
}


GAME.Player.prototype.update = function() {

	if (!this.dead){

		if (!this.cutScene || !this.onGround){
			this.speed.y += this.gravity;
		}

		if (this.speed.y > 0 && this.isJumping){
			this.isJumping = 0;
		}

		if (!this.cutScene){

			if (this.onGround){
				if (this.speed.x < this.maxSpeed){
					this.speed.x += this.acceleration;
				}
			} else if (!this.wasJumping && !this.isFalling){
				// falling
				this.isFalling = 1;
				this.fall();
			}

		}

		if (this.position.y - this.height - 40 > GAME.height){
			// game over
			this.engine.onGameOver();
		}

	    this.position.x += this.speed.x;
	    this.position.y += this.speed.y;

	    GAME.camera.x = this.position.x - 100;

	    this.view.position.x = this.position.x - GAME.camera.x;
	    this.view.position.y = this.position.y - GAME.camera.y;

	}

}

GAME.Player.prototype.reset = function(){

	this.onGround = 1;
	this.isJumping = 0;
	this.wasJumping = 0;
	this.isFalling = 0;
	this.dead = 0;
	this.cutScene = 0;
	this.maxSpeed = 12;
	this.currentAnimSpeed = 0.3;

	this.dropOffRanger();

	this.position.x = 0;
	this.position.y = 345;
    this.speed.y = 0;
    this.speed.x = this.baseSpeed;
    this.view.textures = this.runningFrames;
    this.view.loop = true;

	this.view.animationSpeed = this.currentAnimSpeed;
    this.view.play();

    GAME.camera.x = this.position.x - 100;

    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;

}
