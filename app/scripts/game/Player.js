//--------------------------------------------------------------------------
//  Player Class
//--------------------------------------------------------------------------
GAME.Player = function(){
	console.log("Player");

	this.position = new PIXI.Point;

	// player state
	this.onGround = 0;
	this.isJumping = 0;

	// defaults
	this.position.y = 229;
    this.position.x = 0;
    this.currentAnimSpeed = 0.3;

    this.gravity = 0.4;
    this.acceleration = 0.05;
    this.baseSpeed = 4;
    this.maxSpeed = 12;
    this.speed = new PIXI.Point(this.baseSpeed, 0);

    this.width = 220;
    this.height = 90;

	// animation frames
	this.runningFrames = [
		/*PIXI.Texture.fromFrame("lone-ranger-run.swf/0000"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0001"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0002"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0003"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0004"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0005"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0006"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0007"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0008"),
		PIXI.Texture.fromFrame("lone-ranger-run.swf/0009")*/
		PIXI.Texture.fromFrame("silver_run_final.swf/0000"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0001"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0002"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0003"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0004"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0005"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0006"),
		PIXI.Texture.fromFrame("silver_run_final.swf/0007")
	];

	this.jumpingFrames = [
		/*PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0000"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0001"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0002"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0003"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0004"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0005"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0006"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0007"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0008"),
		PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0009")*/

		PIXI.Texture.fromFrame("silver_jump_final.swf/0000"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0001"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0002"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0003"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0004"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0005"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0006"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0007"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0008"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0009"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0010"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0011"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0012"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0013"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0014"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0015"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0016"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0017"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0018"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0019"),
		PIXI.Texture.fromFrame("silver_jump_final.swf/0020")
	];
	this.fallingFrames = [
		//PIXI.Texture.fromFrame("lone-ranger-jumps.swf/0004")
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

	if (this.onGround){

		this.isJumping = 1;
		this.onGround = 0;

		self = this;
		this.onGround = 0;
		this.speed.y = -9.5;

		this.view.stop();
		this.view.currentFrame = 0;
		this.view.textures = this.jumpingFrames;
		this.view.animationSpeed = 0.4;
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


GAME.Player.prototype.hitObstacle = function() {

	this.speed.x = this.baseSpeed;
	TweenMax.to(this.view, 0.05, {alpha:0.3, yoyo:true, repeat:5, overwrite:"all", startAt:{alpha:1}});

}


GAME.Player.prototype.update = function() {


	this.speed.y += this.gravity * GAME.time.DELTA_TIME;

	if (this.speed.y > 0 && this.isJumping){
		this.isJumping = 0;
	}

	if (this.onGround){
		if (this.speed.x < this.maxSpeed){
			this.speed.x += this.acceleration;
		}
	}
   		

    this.position.x += this.speed.x * GAME.time.DELTA_TIME;
    this.position.y += this.speed.y * GAME.time.DELTA_TIME;

    GAME.camera.x = this.position.x - 140;

    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;
}
