//--------------------------------------------------------------------------
//  Player Class
//--------------------------------------------------------------------------
GAME.Player = function(){
	console.log("Player");

	this.position = new PIXI.Point;

	// player state
	// ON_GROUND, IS_JUMPING, IS_FALLING
	this.state = 0;
	this.onGround = 0;
	this.isJumping = 1;

	// defaults
	this.position.y = 229;
    this.position.x = 0;
    this.currentAnimSpeed = 0.3;

    this.gravity = 0.3;
    this.baseSpeed = 8;
    this.speed = new PIXI.Point(this.baseSpeed, 0);
    this.accel = 0;
    this.width = 220;
    this.height = 37;

	// animation frames
	this.runningFrames = [
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0000"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0001"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0002"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0003"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0004"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0005"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0006"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0007"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0008"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0009")
	];

	this.jumpingFrames = [
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0000"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0001"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0002"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0003"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0004"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0005"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0006"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0007"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0008"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0009")
	];
	this.fallingFrames = [
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0004")
	];
	this.dyingFrames = [];
    
	this.view = new PIXI.MovieClip(this.runningFrames);
	this.view.anchor.x = 0.5;
    this.view.anchor.y = 1;


	this.view.animationSpeed = this.currentAnimSpeed;
    this.view.play();


    this.view.position.x = this.position.x;
    this.view.position.y = this.position.y;

}

GAME.Player.constructor = GAME.Player;

GAME.Player.prototype.jump = function() {

	if (!this.isJumping){

		this.isJumping = 1;

		self = this;
		this.onGround = 0;
		this.speed.y = -7;

		this.view.stop();
		this.view.currentFrame = 0;
		this.view.textures = this.jumpingFrames;
		this.view.animationSpeed = 0.2;
		this.view.loop = false;
		this.view.onComplete = jumpComplete;
		this.view.play();

	}

	function jumpComplete(){
		self.view.stop();
		self.view.currentFrame = 0;
		self.view.textures = self.runningFrames;
		self.view.animationSpeed = 0.4;
		self.view.loop = true;
		self.view.onComplete = null;
		self.view.play();
	}

};

GAME.Player.prototype.update = function() {

	if (this.onGround != 1){

		this.speed.y += this.gravity * GAME.time.DELTA_TIME;
   		
	}else{

		this.speed.y = 0;

	}

    this.position.x += this.speed.x * GAME.time.DELTA_TIME;
    this.position.y += this.speed.y * GAME.time.DELTA_TIME;

    GAME.camera.x = this.position.x - 140;

    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;
}
